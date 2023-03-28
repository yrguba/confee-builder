import { useQuery } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Chat } from './types';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    handleGetChat = (data: { chatId: number }) => {
        return useQuery(['get-chat', data.chatId], () => $axios.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Chat }>(data);
            },
            enabled: !!data.chatId,
        });
    };

    handleGetChats = () => {
        return useQuery(['get-chats'], () => $axios.get(this.pathPrefix), {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Chat[] }>(data);
            },
        });
    };
}

export default new ChatApi();
