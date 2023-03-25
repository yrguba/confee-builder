import { useQuery } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Chat } from './types';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    limit = 10;

    handleGetChats = () => {
        return useQuery(['get-info'], () => $axios.get(this.pathPrefix), {
            staleTime: 10000 * 30,
            select: (data) => {
                return handlers.response<{ data: Chat[] }>(data);
            },
        });
    };
}

export default new ChatApi();
