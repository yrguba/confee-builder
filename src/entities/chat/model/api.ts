import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { axiosClient, socketIo } from 'shared/configs';
import { handlers } from 'shared/lib';

import { Chat } from './types';
import { ChatTypes } from '../index';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    handleGetChat = (data: { chatId: number }) => {
        return useQuery(['get-chat', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Chat }>(data);
            },
            enabled: !!data.chatId,
        });
    };

    handleGetChats = () => {
        return useQuery(['get-chats'], () => axiosClient.get(this.pathPrefix), {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: Chat[] }>(data);
            },
        });
    };

    subscriptions(callback: (action: string) => void) {
        const queryClient = useQueryClient();
        useEffect(() => {
            socketIo.on('receiveMessage', ({ message }) => {
                queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                    cacheData &&
                        cacheData.data.data.forEach((chat: ChatTypes.Chat) => {
                            if (chat.id === Number(message.chat_id)) {
                                chat.message.splice(0, 1, message);
                                if (message.message_status === 'pending') {
                                    chat.pending_messages += 1;
                                }
                            }
                        });
                });
                callback('new-message');
            });
            socketIo.on('receiveMessageStatus', (data) => {
                queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                    cacheData &&
                        cacheData.data.data.forEach((chat: ChatTypes.Chat) => {
                            if (chat.id === Number(data.chat_id)) {
                                chat.pending_messages = data.pending_messages;
                            }
                        });
                    return cacheData;
                });
                queryClient.setQueryData(['get-chat', data.chat_id], (cacheData: any) => {
                    if (cacheData) {
                        cacheData.data.data.pending_messages = data.pending_messages;
                    }
                    return cacheData;
                });
                callback('read-message');
            });
        }, []);
    }
}

export default new ChatApi();
