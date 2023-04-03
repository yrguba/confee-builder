import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { $axios, $socket } from 'shared/configs';
import { response } from 'shared/lib/handlers';

import { Message } from './types';
import message from '../../../features/menu-dropdown/ui/message';
import pages from '../../../pages';
import { Chat } from '../../chat/model/types';
import { messageConstants } from '../index';
import ApiService from '../lib/api-service';
import { message_limit } from '../lib/constants';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    private limit = message_limit;

    handleGetMessages({ page, chatId }: { page: number | undefined; chatId: number }) {
        const queryClient = useQueryClient();
        const chat = queryClient.getQueryData<{ data: { data: Chat } }>(['get-chat', chatId]);
        const initialPage = chat
            ? chat?.data.data.pending_messages === 0
                ? 1
                : Math.ceil(chat.data.data.pending_messages / messageConstants.message_limit)
            : undefined;

        return useInfiniteQuery(
            ['get-messages', chatId],
            ({ pageParam }) => {
                return $axios.get(`${this.pathPrefix}/${chatId}/messages`, {
                    params: {
                        page: pageParam || initialPage,
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
                enabled: !!chatId && !!initialPage,
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

    handleReadMessage() {
        return function (data: { chat_id: number; messages: number[] }) {
            data.messages &&
                $socket().then((socket) => {
                    socket.emit('messageRead', data);
                });
        };
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
                    queryClient.setQueryData(['get-messages', Number(message.chat_id)], (cacheData: any) => {
                        cacheData.pages[cacheData.pages.length - 1].data.data.unshift(message);
                        callback('new-messages');
                        return cacheData;
                    });
                });
                socket.on('receiveReactions', ({ data }) => {
                    console.log('receiveReactions');
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
                socket.on('receiveMessageStatus', (data) => {
                    console.log('receiveMessageStatus', data);
                    callback('read-message');
                    // queryClient.setQueryData(['get-messages', data.chat_id], (cacheData: any) => {
                    //     cacheData.pages.forEach((page: any) => {
                    //         page.data.data.forEach((message: any) => {
                    //             data.messages.forEach((responseMessage: Message) => {
                    //                 if (responseMessage.id === message.id) {
                    //                     message = responseMessage;
                    //                 }
                    //             });
                    //         });
                    //     });
                    //     callback('read-message');
                    //     return cacheData;
                    // });
                });
            });
        }, []);
    }
}

export default new MessageApi();
