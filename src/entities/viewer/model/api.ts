import { useQuery, useMutation } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Viewer } from './types';

class ViewerApi {
    handleGetViewer() {
        const getViewerFn = () => $axios.get('/api/v2/profile');
        return useQuery(['get-viewer'], getViewerFn, {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Viewer }>(data);
            },
        });
    }

    handleLogout() {
        return useMutation((data: null) => $axios.post('/auth/api/v1/user/logout'));
    }
}

export default new ViewerApi();
