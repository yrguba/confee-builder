import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { appTypes } from 'entities/app';
import { axiosClient } from 'shared/configs';
import { useStorage } from 'shared/hooks';
import { httpHandlers } from 'shared/lib';

import { Viewer } from './types';

class ViewerApi {
    private pathPrefix = '/api/v2/profile';

    private storage = useStorage<appTypes.ValuesInStorage>();

    handleGetViewer() {
        return useQuery(['get-viewer'], () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            select: (data) => {
                const updRes = { ...data, data: { data: data.data.data.user } };
                const res = httpHandlers.response<{ data: Viewer }>(updRes);
                this.storage.set('viewer_id', res.data?.data.id);
                return res.data?.data;
            },
        });
    }

    handleEditProfile() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { nickname?: string; avatar?: string; first_name?: string; last_name?: string; email?: string; birth?: Date }) =>
                axiosClient.patch(`/api/v2/user`, Object.fromEntries(Object.entries(data).filter(([_, v]) => v))),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['get-viewer']);
                },
            }
        );
    }

    handleAddAvatar() {
        const queryClient = useQueryClient();

        return useMutation((data: { file: FormData | null }) => axiosClient.post(`${this.pathPrefix}`, data.file), {
            onSuccess: async (data) => {
                queryClient.invalidateQueries(['get-viewer']);
            },
        });
    }

    handleLogout() {
        return useMutation((data?: null) => axiosClient.post('/api/v2/logout'));
    }
}

export default new ViewerApi();
