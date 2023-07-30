import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { axiosClient } from 'shared/configs';
import { handlers } from 'shared/lib';

import useChatStore from './store';
import { Chat, ChatProxy } from './types';
import chatProxy from '../lib/chat-proxy';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    handleGetChat = (data: { chatId: string | undefined }) => {
        return useQuery(['get-chat', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            enabled: !!data.chatId,
            select: (data) => {
                const res = handlers.response<{ data: Chat }>(data);
                return res.data?.data;
            },
        });
    };

    handleGetChats = () => {
        return useQuery(['get-chats'], () => axiosClient.get(this.pathPrefix, { params: { limit: 100 } }), {
            staleTime: Infinity,
            select: (data) => {
                const res = handlers.response<{ data: Chat[] }>(data);
                return { ...res, data: res.data?.data.map((chat): Chat => chat) };
            },
        });
    };
}

export default new ChatApi();
