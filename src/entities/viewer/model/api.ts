import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { handlers } from 'shared/lib';
import { TokenService, UniversalStorage } from 'shared/services';

import useViewerStore from './store';
import { Viewer } from './types';

class ViewerApi {
    private pathPrefix = '/api/v2/profile';

    handleGetViewer() {
        const token = TokenService.get();
        return useQuery(['get-viewer'], () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            select: (data) => {
                UniversalStorage.localStorageSet('viewer', data.data.data);
                return handlers.response<{ data: Viewer }>(data);
            },
        });
    }

    handleAddAvatar() {
        const queryClient = useQueryClient();
        const setSocketAction = useViewerStore.use.setSocketAction();

        return useMutation((data: { file: FormData | null }) => axiosClient.patch(`${this.pathPrefix}/avatar`, data.file), {
            onSuccess: async (data) => {
                queryClient.setQueryData(['get-viewer'], (cacheData: any) => {
                    cacheData.data.data = data.data.data;
                    setSocketAction(`viewer-avatar${new Date().valueOf()}`);
                    return cacheData;
                });
            },
        });
    }

    handleLogout() {
        return useMutation((data: null) => axiosClient.post('/api/v2/authorization/logout'));
    }
}

export default new ViewerApi();
