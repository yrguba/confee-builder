import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { useArray } from 'shared/hooks';

import messageEntity from './entity';

class MessageApi {
    pathPrefix = '/api/v2/chats';

    handleGetMessages({ initialPage, chatId }: { initialPage: number | undefined; chatId: number }) {
        const message_limit = 20;
        const { getUniqueArr } = useArray({});
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
                    return {
                        pages: getUniqueArr(
                            data.pages.reduce((messages: any, page: any) => [...[...page.data.data].reverse(), ...messages], []),
                            'id'
                        ),
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                enabled: !!chatId && !!initialPage,
                staleTime: Infinity,
            }
        );
    }

    handleSendTextMessage() {
        const queryClient = useQueryClient();
        const viewerData: any = queryClient.getQueryData(['get-viewer']);
        return useMutation(
            (data: { text: string; chatId: number }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/messages`, { text: data.text, message_type: 'text' }),
            {
                onMutate: async (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        const message = messageEntity({ text: data.text, viewer: viewerData?.data.data });
                        cacheData.pages[0].data.data.unshift(message);
                        return cacheData;
                    });
                },
            }
        );
    }
}

export default new MessageApi();
