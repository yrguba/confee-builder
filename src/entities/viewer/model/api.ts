import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { appTypes } from 'entities/app';
import { companyTypes } from 'entities/company';
import { axiosClient, AxiosError } from 'shared/configs';
import { useStorage } from 'shared/hooks';
import { httpHandlers } from 'shared/lib';

import { Viewer } from './types';

class ViewerApi {
    private pathPrefix = '/api/v2/profile';

    handleGetViewer() {
        const storage = useStorage<appTypes.ValuesInStorage>();
        return useQuery(['get-viewer'], () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: { user: Viewer; session: any; companies: companyTypes.Company[] } }>(res);
                storage.set('viewer_id', updRes.data?.data.user.id);
                return updRes;
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
        return useMutation((data: { file: FormData | null }) => axiosClient.post(`/api/v2/user/avatar`, data.file), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-viewer']);
            },
        });
    }

    handleLogout() {
        return useMutation((data?: null) => axiosClient.post('/api/v2/logout'));
    }

    handleDeleteAccount() {
        return useMutation((data?: null) => axiosClient.delete('/api/v2/user'));
    }
}

export default new ViewerApi();
