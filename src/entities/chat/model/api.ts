import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { MessageTypes } from 'entities/message';
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

    handleGetChatFiles = (data: { chatId: number; fileType: MessageTypes.MessageType }) => {
        return useQuery(['get-chat-files', data.chatId, data.fileType], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/files/${data.fileType}`), {
            staleTime: Infinity,
            select: (data) => {
                return handlers.response<{ data: { files: MessageTypes.File[] } }>(data);
            },
        });
    };

    handleSubscribeToChat = () => {
        return (chatId: number) => {
            socketIo.emit('chatListeners', {
                sub: chatId,
            });
        };
    };

    handleUnsubscribeFromChat = () => {
        return (chatId: number) => {
            socketIo.emit('chatListeners', {
                unsub: chatId,
            });
        };
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
                queryClient.setQueryData(['get-chat', Number(message.chat_id)], (cacheData: any) => {
                    if (cacheData && message.message_status === 'pending') {
                        cacheData.data.data.pending_messages += 1;
                    }
                    return cacheData;
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
