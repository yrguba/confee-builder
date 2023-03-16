import { useQuery } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Chat } from './types';

export const handleGetChats = () => {
    const getViewerFn = () => $axios.get('/auth/api/v1/users');
    return useQuery(['get-info'], getViewerFn, {
        staleTime: 10000 * 30,
        select: (data) => {
            return handlers.response<Chat[]>(data);
        },
    });
};
