import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { MessageTypes } from 'entities/message';
import { axiosClient, socketIo } from 'shared/configs';
import { handlers } from 'shared/lib';

import useChatStore from './store';
import { Chat, ChatProxy } from './types';
import chatProxy from '../lib/chat-proxy';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    handleGetChat = (data: { chatId: number }) => {
        return useQuery(['get-chat', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            select: (data) => {
                const res = handlers.response<{ data: ChatProxy }>(data);
                return res.data ? { ...res, data: { data: chatProxy(res.data.data) } } : res;
            },
            enabled: !!data.chatId,
        });
    };

    handleGetChats = () => {
        return useQuery(['get-chats'], () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            select: (data) => {
                const res = handlers.response<{ data: Chat[] }>(data);
                return { ...res, data: res.data?.data.map((chat): ChatProxy => chatProxy(chat)) };
            },
        });
    };

    handleGetChatWithUser = (data: { userId: number }) => {
        return useQuery(['get-chat-with-user', data.userId], () => axiosClient.get(`${this.pathPrefix}/chat/with-user/${data.userId}`), {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Chat }>(data);
            },
        });
    };

    handleGetChatFiles = (data: { id: string | undefined; byUserId: boolean; fileType: any }) => {
        const getFiles = (chatId: number | undefined) => {
            return useQuery(['get-chat-files', Number(data.id), data.fileType], () => axiosClient.get(`${this.pathPrefix}/${chatId}/files/${data.fileType}`), {
                staleTime: Infinity,
                enabled: !!chatId || !!data.fileType,
                select: (data) => {
                    return handlers.response<{ data: { files: MessageTypes.File[] } }>(data);
                },
            });
        };
        if (data.byUserId) {
            const { data: privateChatData } = this.handleGetChatWithUser({ userId: Number(data.id) });
            return getFiles(privateChatData?.data?.data.id);
        }
        return getFiles(Number(data.id));
    };

    handleCreateChat() {
        return useMutation((data: { name?: string; users: number[]; is_group: boolean }) => axiosClient.post(this.pathPrefix, data));
    }

    handleSubscribeToChat = () => ({
        mutate: (chatId: number) => {
            socketIo.emit('chatListeners', {
                sub: chatId,
            });
        },
    });

    handleUnsubscribeFromChat = () => ({
        mutate: (chatId: number) => {
            socketIo.emit('chatListeners', {
                unsub: chatId,
            });
        },
    });
}

export default new ChatApi();
