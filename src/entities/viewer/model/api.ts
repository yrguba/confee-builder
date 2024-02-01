import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosClient, AxiosError } from 'shared/configs';
import { useQueryWithLocalDb, useStorage } from 'shared/hooks';
import { Response } from 'shared/types';

import { Session, Viewer } from './types';
import { companyTypes } from '../../company';

class ViewerApi {
    private pathPrefix = '/api/v2/profile';

    handleGetViewer(enabled = true) {
        const storage = useStorage();
        const cacheId = ['get-viewer'];
        // return useQueryWithLocalDb<Response.QueryResult<{ user: Viewer; session: Session; companies: companyTypes.Company[] }>>(cacheId, ({ save }) =>
        //     useQuery(cacheId, () => axiosClient.get(this.pathPrefix), {
        //         staleTime: Infinity,
        //         enabled,
        //         select: (res) => {
        //             save(res, cacheId);
        //             storage.set('viewer_id', res.data?.data.user.id);
        //             return res;
        //         },
        //     })
        // );
        return useQuery(cacheId, () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            enabled,
            select: (res) => {
                storage.set('viewer_id', res.data?.data.user.id);
                return res;
            },
        });
    }

    handleEditProfile() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { nickname?: string; avatar?: string; first_name?: string; last_name?: string; email?: string; birth?: Date; about?: string }) =>
                axiosClient.patch(`/api/v2/user`, data),
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

    handClearBirthday() {
        const queryClient = useQueryClient();
        return useMutation(() => axiosClient.post('/api/v2/user/birth'), {
            onSuccess: () => {
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
