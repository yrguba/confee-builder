import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { $axios, $socket } from 'shared/configs';
import { response } from 'shared/lib/handlers';

import { Massage } from './types';
import message from '../../../features/menu-dropdown/ui/message';
import ApiService from '../lib/api-service';
import { message_limit } from '../lib/constants';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    private limit = message_limit;

    handleGetMessages({ page, chatId }: { page: number | undefined; chatId: number }) {
        return useInfiniteQuery(
            ['get-messages', chatId],
            ({ pageParam }) => {
                return $axios.get(`${this.pathPrefix}/${chatId}/messages`, {
                    params: {
                        page: pageParam || page,
                        limit: this.limit,
                    },
                });
            },
            {
                getPreviousPageParam: (lastPage, pages) => {
                    if (lastPage?.data.page === 1) return undefined;
                    return lastPage?.data.page - 1;
                },
                getNextPageParam: (lastPage, pages) => {
                    if (lastPage?.data.page === Math.ceil(lastPage.data.total / this.limit)) return undefined;
                    return lastPage?.data.page + 1;
                },
                select: (data) => {
                    return {
                        pages: data.pages.map((page) => [...page.data.data].reverse()).reverse(),
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                enabled: !!chatId && !!page,
                staleTime: Infinity,
            }
        );
    }

    handleSendTextMessage() {
        return useMutation(
            (data: { text: string; chatId: number }) => $axios.post(`${this.pathPrefix}/message/${data.chatId}`, { text: data.text, message_type: 'text' }),
            {
                onMutate: () => {},
                onSettled: () => {},
                onError: () => {},
            }
        );
    }

    handleSendReaction() {
        return useMutation(
            (data: { chatId: number; messageId: number; reaction: string }) =>
                $axios.post(`${this.pathPrefix}/${data.chatId}/message/${data.messageId}/reaction`, { reaction: data.reaction }),
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
            $socket().then((socket) => {
                socket.on('receiveMessage', ({ message }) => {
                    queryClient.setQueryData(['get-messages', message.chat_id], (cacheData: any) => {
                        cacheData.pages[cacheData.pages.length - 1].data.data.unshift(message);
                        callback('new-messages');
                        return cacheData;
                    });
                });
                socket.on('receiveReactions', ({ data }) => {
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
            });
        }, []);
    }
}

export default new MessageApi();
