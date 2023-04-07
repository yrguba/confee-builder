import { useQuery, useMutation } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Viewer } from './types';

class ViewerApi {
    handleGetViewer() {
        const getViewerFn = () => axiosClient.get('/api/v2/profile');
        return useQuery(['get-viewer'], getViewerFn, {
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
