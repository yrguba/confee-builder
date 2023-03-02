import { useQuery } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Viewer } from './types';

export const handleGetViewer = () => {
    const getViewerFn = () => $axios.get('/auth/api/v1/user');
    return useQuery(['get-viewer'], getViewerFn, {
        staleTime: 10000 * 30,
        select: (data) => {
            return handlers.response<Viewer>(data);
        },
    });
};
