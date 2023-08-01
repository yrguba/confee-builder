import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { number } from 'yup';

import { axiosClient } from 'shared/configs';
import { useArray, useWebSocket } from 'shared/hooks';

import useMessageStore from './store';
import { Message, MessageProxy } from './types';
import pages from '../../../pages';
import { chatService } from '../../chat';
import { message_limit } from '../lib/constants';
import messageEntity from '../lib/message-entity';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    socket = useWebSocket<any, 'MessageRead'>();

    handleGetMessages({ initialPage, chatId }: { initialPage: number | undefined; chatId: number }) {
        const { getUniqueArr } = useArray({});
        return useInfiniteQuery(
            ['get-messages', chatId],
            ({ pageParam }) => {
                return axiosClient.get(`${this.pathPrefix}/${chatId}/messages`, {
                    params: {
                        page: pageParam || initialPage,
                        per_page: 100,
                    },
                });
            },
            {
                getPreviousPageParam: (lastPage, pages) => {
                    const { current_page } = lastPage?.data.meta;
                    return current_page > 1 ? current_page - 1 : undefined;
                },
                getNextPageParam: (lastPage, pages) => {
                    const { current_page, last_page } = lastPage?.data.meta;
                    return current_page < last_page ? current_page + 1 : undefined;
                },
                select: (data) => {
                    return {
                        pages: getUniqueArr(
                            data.pages?.reduce((messages: any, page: any) => [...[...page.data.data].reverse(), ...messages], []),
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
                        return produce(cacheData, (draft: any) => {
                            draft.pages[0].data.data.unshift(message);
                        });
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
        const queryClient = useQueryClient();
        const viewerData: any = queryClient.getQueryData(['get-viewer']);
        return useMutation(
            (data: { text: string; messageId: number; chatId: number; reply: MessageProxy }) =>
                axiosClient.post(`${this.pathPrefix}/reply/message/${data.chatId}/${data.messageId}`, { text: data.text, message_type: 'text' }),
            {
                onMutate: async (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        const message = messageEntity({ text: data.text, viewer: viewerData?.data.data, reply: data.reply });
                        cacheData.pages[0].data.data.unshift(message);
                        return cacheData;
                    });
                },
            }
        );
    }

    handleDeleteMessage() {
        return useMutation((data: { messages: string[]; fromAll: boolean; chatId: number }) =>
            axiosClient.delete(`${this.pathPrefix}/${data.chatId}/messages`, { data: { fromAll: data.fromAll, messages: data.messages } })
        );
    }

    handleReadMessage() {
        const queryClient = useQueryClient();

        return {
            mutate: (data: { chat_id: number; message_id: number }) => {
                // queryClient.setQueryData(['get-messages', data.chat_id], (cacheData: any) => {
                //     if (!cacheData?.pages?.length) return cacheData;
                //     return produce(cacheData, (draft: any) => {
                //         draft?.pages?.forEach((page: any) => {
                //             page?.data?.data.forEach((msg: any) => {
                //                 // console.log(data.message_id);
                //                 if (data.message_id > msg.id) {
                //                     console.log(msg.id);
                //                     console.log('read', data.message_id);
                //                     msg.is_read = true;
                //                 } else {
                //                     msg.is_read = false;
                //                 }
                //             });
                //         });
                //     });
                // });
                data.message_id && this.socket.sendMessage('MessageRead', data);
            },
        };
    }

    handleMessageAction = () => {
        return {
            // mutate: (data: { chatId: number; action: string }) => ({
            //     mutate: socketIo.emit('messageAction', { chat_id: data.chatId, action: data.action }),
            // }),
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
