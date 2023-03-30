import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { $axios, $socket } from 'shared/configs';

import useMessageStore from './store';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    private limit = 20;

    handleGetMessages({ page = 1, chatId }: { page: number; chatId: string | undefined }) {
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
                    const pages = [...data.pages].reverse();
                    return {
                        pages,
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                enabled: !!chatId,
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

    subscriptions(callback: (action: string) => void) {
        const queryClient = useQueryClient();
        useEffect(() => {
            $socket().then((socket) => {
                socket.on('receiveMessage', ({ message }) => {
                    console.log(message);
                    queryClient.setQueryData(['get-messages', message.chat_id], (cacheData: any) => {
                        cacheData.pages[cacheData.pages.length - 1].data.data.unshift(message);
                        callback('new-messages');
                        return cacheData;
                    });
                });
            });
        }, []);
        return 'tt';
    }
}

export default new MessageApi();
