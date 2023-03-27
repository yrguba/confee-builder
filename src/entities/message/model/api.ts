import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import {} from 'shared/configs/socket';
import { $socket, $axios } from 'shared/configs';

class MessageApi {
    // private queryClient = useQueryClient();

    private pathPrefix = '/api/v2/chats';

    private limit = 10;

    handleGetMessages({ page = 1, chatId }: { page: number; chatId: string }) {
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
                    if (lastPage.data.page === 1) return undefined;
                    return lastPage.data.page - 1;
                },
                getNextPageParam: (lastPage, pages) => {
                    if (lastPage.data.page === Math.ceil(lastPage.data.total / this.limit)) return undefined;
                    return lastPage.data.page + 1;
                },
                select: (data) => {
                    return data;
                },
                staleTime: Infinity,
            }
        );
    }

    subscriptions() {
        $socket().then((socket) => {
            socket.on('receiveMessage', ({ message }) => {
                const queryClient = useQueryClient();
                queryClient.setQueriesData(['get-messages', 77], (oldData: any) => {
                    oldData.pages[oldData.pages - 1].data.data.push(message);
                });
                // socket.close();
            });
        });
    }
}

export default new MessageApi();
