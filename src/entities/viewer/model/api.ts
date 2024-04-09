import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { useStorage } from 'shared/hooks';

import viewerStore from './store';
import { Session, Viewer } from './types';
import { Company } from '../../company/model/types';

class ViewerApi {
    private pathPrefix = '/api/v2/profile';

    viewer = viewerStore.getState().viewer.value;

    handleGetAllSessions(enabled = true) {
        const cacheId = ['get-sessions'];
        return useQuery(cacheId, () => axiosClient.get('/api/v2/sessions/all'), {
            staleTime: Infinity,
            enabled,
            select: (res) => {
                return res.data.data as Session[];
            },
        });
    }

    handleGetViewer() {
        const cacheId = ['get-viewer'];
        return useQuery(cacheId, () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            enabled: !!viewerStore.getState().tokens.value?.access_token,
            select: (res) => {
                return res.data?.data as { user: Viewer; session: Session; companies: Company[] };
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

    handleDeleteSessions() {
        const queryClient = useQueryClient();
        return useMutation((data?: { session_ids: string[] }) => axiosClient.delete('/api/v2/sessions/by-ids', { data }), {
            onSuccess: (res) => {
                queryClient.invalidateQueries(['get-sessions']);
            },
        });
    }

    handleDeleteAccount() {
        return useMutation((data?: null) => axiosClient.delete('/api/v2/user'));
    }
}

export default new ViewerApi();
