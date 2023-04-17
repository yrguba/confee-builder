import { useQuery, useMutation } from '@tanstack/react-query';
import OneSignal from 'react-onesignal';

import { axiosClient } from 'shared/configs';
import { handlers } from 'shared/lib';
import { TokenService } from 'shared/services';

import { Viewer } from './types';

class ViewerApi {
    handleGetViewer() {
        const token = TokenService.get();
        return useQuery(['get-viewer'], () => axiosClient.get('/api/v2/profile'), {
            enabled: !!token?.access_token,
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Viewer }>(data);
            },
        });
    }

    handleLogout() {
        return useMutation((data: null) => axiosClient.post('/api/v2/authorization/logout'));
    }
}

export default new ViewerApi();
