import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { $axios } from 'shared/configs';

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
                    return {
                        pages: [...data.pages].reverse(),
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                enabled: !!chatId,
                staleTime: Infinity,
            }
        );
    }

    handleSendTextMessage() {
        return useMutation((data: { text: string; chatId: number }) =>
            $axios.post(`${this.pathPrefix}/message/${data.chatId}`, { text: data.text, message_type: 'text' })
        );
    }
}

export default new MessageApi();
