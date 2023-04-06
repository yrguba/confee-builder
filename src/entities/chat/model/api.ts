import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { MessageTypes } from 'entities/message';
import { axiosClient, socketIo } from 'shared/configs';
import { handlers } from 'shared/lib';

import chatProxy from './proxy';
import { Chat, ChatProxy } from './types';
import { UserTypes } from '../../user';
import { ChatTypes } from '../index';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    handleGetChat = (data: { chatId: number }) => {
        return useQuery(['get-chat', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            select: (data) => {
                const res = handlers.response<{ data: Chat }>(data);
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

    handleGetChatFiles = (data: { id: string | undefined; byUserId: boolean; fileType: MessageTypes.MessageType }) => {
        const getFiles = (chatId: number | undefined) => {
            return useQuery(['get-chat-files', Number(data.id), data.fileType], () => axiosClient.get(`${this.pathPrefix}/${chatId}/files/${data.fileType}`), {
                staleTime: Infinity,
                enabled: !!chatId,
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

    subscriptions(callback: (data: { action: string; data?: any }) => void) {
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
                callback({ action: 'new-message' });
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
                callback({ action: 'read-message' });
            });
            socketIo.on('receiveMessageAction', ({ message }) => {
                callback({ action: 'message-action', data: message });
            });
        }, []);
    }
}

export default new ChatApi();
