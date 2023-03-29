import { useQuery, useMutation } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Viewer } from './types';

class ViewerApi {
    handleGetViewer() {
        const getViewerFn = () => $axios.get('/auth/api/v1/user');
        return useQuery(['get-viewer'], getViewerFn, {
            staleTime: 10000 * 30,
            select: (data) => {
                return handlers.response<Viewer>(data);
            },
        });
    }

    handleLogout() {
        return useMutation((data: null) => $axios.post('/auth/api/v1/user/logout'));
    }
}

export default new ViewerApi();
