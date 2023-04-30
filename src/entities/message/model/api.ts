import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { date } from 'yup';

import { axiosClient, socketIo } from 'shared/configs';
import { uniqueArray } from 'shared/lib';

import useMessageStore from './store';
import { Message, MessageProxy } from './types';
import { message_limit } from '../lib/constants';
import messageEntity from '../lib/message-entity';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    handleGetMessages({ initialPage, chatId }: { initialPage: number | undefined; chatId: number }) {
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
                        pages: uniqueArray(
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
        const setSocketAction = useMessageStore.use.setSocketAction();
        const viewerData: any = queryClient.getQueryData(['get-viewer']);
        return useMutation(
            (data: { text: string; chatId: number }) =>
                axiosClient.post(`${this.pathPrefix}/message/${data.chatId}`, { text: data.text, message_type: 'text' }),
            {
                onMutate: async (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        const message = messageEntity({ text: data.text, viewer: viewerData?.data.data });
                        cacheData.pages[0].data.data.unshift(message);
                        setSocketAction(`add${message.id}`);
                        return cacheData;
                    });
                },
            }
        );
    }

    handleSendFileMessage() {
        return useMutation((data: { files: FormData | undefined | null; chatId: number }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/file_message`, data.files)
        );
    }

    handleForwardMessages() {
        return useMutation((data: { messagesIds: number[]; chatId: number }) =>
            axiosClient.post(`${this.pathPrefix}/forward/message/${data.chatId}`, { messages: data.messagesIds })
        );
    }

    handleReplyMessage() {
        return useMutation((data: { text: string; messageId: number; chatId: number }) =>
            axiosClient.post(`${this.pathPrefix}/reply/message/${data.chatId}/${data.messageId}`, { text: data.text, message_type: 'text' })
        );
    }

    handleDeleteMessage() {
        return useMutation((data: { messages: string[]; fromAll: boolean; chatId: number }) =>
            axiosClient.delete(`${this.pathPrefix}/message/${data.chatId}`, { data: { fromAll: data.fromAll, messages: data.messages } })
        );
    }

    handleReadMessage() {
        return {
            mutate: (data: { chat_id: number; messages: number[] }) => {
                data.messages && socketIo.emit('messageRead', data);
            },
        };
    }

    handleMessageAction = () => {
        return {
            mutate: (data: { chatId: number; action: string }) => ({
                mutate: socketIo.emit('messageAction', { chat_id: data.chatId, action: data.action }),
            }),
        };
    };

    handleSendReaction() {
        return useMutation((data: { chatId: number; messageId: number; reaction: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/message/${data.messageId}/reaction`, { reaction: data.reaction })
        );
    }

    handleChangeTextInMessages() {
        return useMutation((data: { chatId: number; messageId: number; text: string }) =>
            axiosClient.patch(`${this.pathPrefix}/message/${data.chatId}/${data.messageId}`, { text: data.text })
        );
    }
}

export default new MessageApi();
