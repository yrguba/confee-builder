import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { ViewerService } from 'entities/viewer';
import { axiosClient, socketIo } from 'shared/configs';
import { uniqueArray } from 'shared/lib';
import { response } from 'shared/lib/handlers';

import messageProxy from './proxy';
import { Message, MessageProxy } from './types';
import { message_limit } from '../lib/constants';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    handleGetMessages({ initialPage, chatId }: { initialPage: number | undefined; chatId: number }) {
        const viewerId = ViewerService.getId();

        return useInfiniteQuery(
            ['get-messages', chatId],
            ({ pageParam }) => {
                return axiosClient.get(`${this.pathPrefix}/${chatId}/messages`, {
                    params: {
                        page: pageParam || initialPage,
                        limit: message_limit,
                    },
                });
            },
            {
                getPreviousPageParam: (lastPage, pages) => {
                    if (lastPage?.data.page === 1) return undefined;
                    return lastPage?.data.page - 1;
                },
                getNextPageParam: (lastPage, pages) => {
                    if (lastPage?.data.page === Math.ceil(lastPage.data.total / message_limit)) return undefined;
                    return lastPage?.data.page + 1;
                },
                select: (data) => {
                    if (!data.pages.length) return data;
                    const messages: Message[] = data.pages.reduce((messages: any, page: any) => [...[...page.data.data].reverse(), ...messages], []);
                    const addProxy: any[] = uniqueArray(messages, 'id').filter((message: Message, index: number) =>
                        messageProxy(messages[index - 1], message, viewerId)
                    );
                    return {
                        pages: addProxy,
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                enabled: !!chatId && !!initialPage,
                staleTime: Infinity,
            }
        );
    }

    handleSendTextMessage() {
        return useMutation(
            (data: { text: string; chatId: number }) =>
                axiosClient.post(`${this.pathPrefix}/message/${data.chatId}`, { text: data.text, message_type: 'text' }),
            {
                onMutate: () => {},
                onSettled: () => {},
                onError: () => {},
            }
        );
    }

    handleReadMessage() {
        return (data: { chat_id: number; messages: number[] }) => {
            data.messages && socketIo.emit('messageRead', data);
        };
    }

    handleSendReaction() {
        return useMutation(
            (data: { chatId: number; messageId: number; reaction: string }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/message/${data.messageId}/reaction`, { reaction: data.reaction }),
            {
                onMutate: () => {},
                onSettled: () => {},
                onError: () => {},
            }
        );
    }

    subscriptions(callback: (action: string) => void) {
        const queryClient = useQueryClient();
        useEffect(() => {
            socketIo.on('receiveMessage', ({ message }) => {
                queryClient.setQueryData(['get-messages', Number(message.chat_id)], (cacheData: any) => {
                    if (cacheData) {
                        const pageOne = cacheData.pages.find((page: any) => page.data.page === 1);
                        if (pageOne) {
                            const firstMessage = pageOne.data.data[0];
                            if (firstMessage.id !== message.id) {
                                pageOne.data.data.unshift(message);
                                callback('new-messages');
                            }
                        }
                    }
                    return cacheData;
                });
            });
            socketIo.on('receiveReactions', ({ data }) => {
                queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                    cacheData.pages.forEach((page: any) => {
                        page.data.data.forEach((message: any) => {
                            if (message.id === data.messageId) {
                                message.reactions = { ...data.reactions };
                            }
                        });
                    });
                    callback('reaction');
                    return cacheData;
                });
            });
            socketIo.on('receiveMessageStatus', (data) => {
                queryClient.setQueryData(['get-messages', data.chat_id], (cacheData: any) => {
                    cacheData &&
                        cacheData.pages.forEach((page: any) => {
                            page.data.data.forEach((message: Record<string, any>) => {
                                data.messages.forEach((responseMessage: Record<string, any>, index: number) => {
                                    if (responseMessage.id === message.id) {
                                        Object.keys(responseMessage).forEach((key) => {
                                            message[key] = responseMessage[key];
                                        });
                                        message.message_status = responseMessage.message_status;
                                    }
                                });
                            });
                        });
                    callback('read-message');
                    return cacheData;
                });
            });
        }, []);
    }
}

export default new MessageApi();
