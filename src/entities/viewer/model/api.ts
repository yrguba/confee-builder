import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { appTypes } from 'entities/app';
import { axiosClient } from 'shared/configs';
import { useStorage } from 'shared/hooks';
import { httpHandlers } from 'shared/lib';

import { Viewer, Contact } from './types';

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

    handleGetContacts() {
        return useQuery(['get-contacts'], () => axiosClient.get('api/v2/contacts'), {
            staleTime: Infinity,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: Contact[] }>(res);
                return updRes.data?.data;
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
        return useMutation((data: { file: FormData | null }) => axiosClient.post(`/api/v2/profile`, { images: data.file }), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-viewer']);
            },
        });
    }

    handleCreateContact() {
        const queryClient = useQueryClient();
        return useMutation((data: { first_name: string; phone: string }) => axiosClient.post(`/api/v2/contacts`, { contacts: [data] }), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-contacts']);
            },
        });
    }

    handleLogout() {
        return useMutation((data?: null) => axiosClient.post('/api/v2/logout'));
    }
}

export default new ViewerApi();
