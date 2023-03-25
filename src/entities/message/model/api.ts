import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { $axios } from 'shared/configs';

class MessageApi {
    pathPrefix = '/api/v2/chats';

    limit = 10;

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
            }
        );
    }
}

export default new MessageApi();
