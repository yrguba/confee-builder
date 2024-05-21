import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

import { appApi } from 'entities/app';
import { axiosClient, axios } from 'shared/configs';
import { useStorage, useWebSocket } from 'shared/hooks';

import { File, Message, MessageProxy, MessageType, MessageWithChatGpt, SocketOut } from './types';
import { getRandomString, httpHandlers } from '../../../shared/lib';
import audioStore from '../../../shared/ui/media-content/audio/store';
import { Chat } from '../../chat/model/types';
import { viewerStore } from '../../viewer';
import { messageService } from '../index';
import { messages_limit } from '../lib/constants';
import mockMessage from '../lib/mock';

class MessageApi {
    private pathPrefix = '/api/v2/chats';

    viewer = viewerStore.getState().viewer;

    socket = useWebSocket<any, SocketOut>();

    handleGetMessagesWithChatGpt() {
        const storage = useStorage();
        return useQuery(['get-messages', 'with-chat-gpt'], () => axios.get(`https://gpt.confee.ru/api/history/${this.viewer.value.id}`), {
            select: (data) => {
                return data.data.history as MessageWithChatGpt[];
            },
        });
    }

    handleSendTextMessageWithChatGpt() {
        return useMutation((data: { text: string }) => {
            const storage = useStorage();
            return axios.post(`https://gpt.confee.ru/api/send-text`, { ...data, id: this.viewer.value.id });
        });
    }

    handleClearHistoryWithChatGpt() {
        return useMutation(() => {
            const storage = useStorage();
            return axios.post(`https://gpt.confee.ru/api/clear-history/${this.viewer.value.id}`);
        });
    }

    handleGetMessages({ initialPage, chatId }: { initialPage: number | undefined | null; chatId: number }) {
        const cacheId = ['get-messages', String(chatId)];

        return useInfiniteQuery(
            ['get-messages', chatId],
            ({ pageParam }) => {
                return axiosClient.get(`${this.pathPrefix}/${chatId}/messages`, {
                    params: {
                        page: pageParam || initialPage,
                        per_page: messages_limit,
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
                        pages: data.pages,
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                enabled: !!chatId && !!initialPage,
                staleTime: Infinity,
            }
        );
    }

    handleGetAudioPosition(data: { audioId?: number; chatId?: number }) {
        return useQuery(
            ['get-audio-position', data.audioId, data.chatId],
            () => axiosClient.get(`api/v2/chats/${data.chatId}/audios/${data.audioId}`, { params: { per_page: 10 } }),
            {
                enabled: !!data.audioId && !!data.chatId,
                select: (data) => {
                    return data.data.meta.current_page;
                },
            }
        );
    }

    handleGetAudios(data: { initialPage?: number | undefined | null; chatId?: number }) {
        return useInfiniteQuery(
            ['get-audios', data.chatId],
            ({ pageParam }) => {
                return axiosClient.get(`api/v2/chats/${data.chatId}/audios`, {
                    params: {
                        page: pageParam || data.initialPage,
                        per_page: 1000,
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
                        pages: data.pages,
                        pageParams: [...data.pageParams].reverse(),
                    };
                },
                refetchOnWindowFocus: true,
                enabled: !!data.chatId && !!data.initialPage,
            }
        );
    }

    handleSearchMessages({ chatId, text }: { text: string; chatId: number }) {
        return useInfiniteQuery(
            ['search-messages', chatId, text],
            ({ pageParam }) => {
                return axiosClient.get(`${this.pathPrefix}/${chatId}/messages`, {
                    params: {
                        page: pageParam || 1,
                        text,
                    },
                });
            },
            {
                getNextPageParam: (lastPage, pages) => {
                    const { current_page, last_page } = lastPage?.data.meta;
                    return current_page < last_page ? current_page + 1 : undefined;
                },
                select: (data) => {
                    return {
                        pages: data.pages,
                        pageParams: data.pageParams,
                    };
                },
                enabled: !!chatId,
                staleTime: Infinity,
            }
        );
    }

    handleSendTextMessage() {
        const queryClient = useQueryClient();
        const viewerData: any = queryClient.getQueryData(['get-viewer']);
        return useMutation(
            (data: { text: string; chatId: number; params?: { reply_to_message_id?: number }; replyMessage?: MessageProxy | null }) => {
                const log_id = getRandomString(10);
                console.log('отправка newMessage', log_id, `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
                return axiosClient.post(
                    `${this.pathPrefix}/${data.chatId}/messages`,
                    { text: data.text, message_type: 'text', log_id },
                    { params: data.params }
                );
            },
            {
                onMutate: async (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        const message = mockMessage({ text: data.text, author: viewerData?.data.data.user, reply: data.replyMessage });
                        return produce(cacheData, (draft: any) => {
                            draft.pages[0].data.data.unshift(message);
                        });
                    });
                },
                onSuccess: (data) => {
                    const message = data.data.data;

                    messageService.updateMockMessage(
                        { users_have_read: message.users_have_read, chatId: message.chat_id, filesType: message.type, id: message.id },
                        queryClient
                    );
                },
                onError: (error, variables, context) => {
                    messageService.updateMockMessage({ ...variables, filesType: 'text' }, queryClient, true);
                },
            }
        );
    }

    handleSendFileMessage() {
        const queryClient = useQueryClient();
        const viewerData: any = queryClient.getQueryData(['get-viewer']);

        return useMutation(
            (data: {
                files: FormData | undefined | null;
                chatId: number;
                params?: { reply_to_message_id?: number };
                replyMessage?: MessageProxy | null;
                filesForMock: File[];
                filesType: MessageType;
            }) => axiosClient.post(`${this.pathPrefix}/${data.chatId}/file_message`, data.files, { params: data.params }),
            {
                onMutate: async (data) => {},
                onSuccess: (data, variables) => {
                    const message = data.data.data;
                    queryClient.setQueryData(['get-messages', variables.chatId], (cacheData: any) => {
                        return produce(cacheData, (draft: any) => {
                            draft.pages[0].data.data.unshift(message);
                        });
                    });
                },
                onError: (error, variables, context) => {
                    messageService.updateMockMessage(variables, queryClient, true);
                },
            }
        );
    }

    handleGetMessageOrder = (data: { chatId: number | undefined; messageId: number | null | undefined }) => {
        return useQuery(
            ['get-message-order', data.chatId, data.messageId],
            () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/message/${data.messageId}`, { params: { per_page: messages_limit } }),
            {
                enabled: !!data.chatId && !!data.messageId,
                select: (data) => {
                    const res = httpHandlers.response<{ data: Message }>(data);
                    return res.data?.data;
                },
            }
        );
    };

    handleForwardMessages() {
        const queryClient = useQueryClient();
        const viewerData: any = queryClient.getQueryData(['get-viewer']);
        return useMutation(
            (data: { messages: Message[]; chatId: number }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/messages/forward`, { forward_from_message_ids: data.messages.map((i) => i.id) }),
            {
                onMutate: (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        const messages = data.messages.map((i: any) => {
                            return mockMessage({
                                text: i.text,
                                author: i.author,
                                files: i.files,
                                type: i.type,
                                reply: i.reply_to_message,
                                forward: i,
                            });
                        });
                        return produce(cacheData, (draft: any) => {
                            draft.pages[0].data.data = [...messages, ...draft.pages[0].data.data];
                        });
                    });
                },
                onSuccess: (data, variables) => {
                    queryClient.invalidateQueries(['get-messages', variables.chatId]);
                },
            }
        );
    }

    handleEditTextMessage() {
        const queryClient = useQueryClient();

        return useMutation(
            (data: { chatId: number; messageId: number; text: string }) => {
                const log_id = getRandomString(10);
                console.log('отправка updateMessage', log_id, `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
                return axiosClient.post(`${this.pathPrefix}/${data.chatId}/messages/${data.messageId}`, { text: data.text, log_id });
            },
            {
                onMutate: async (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        return produce(cacheData, (draft: any) => {
                            if (draft?.pages?.length) {
                                draft?.pages.forEach((page: any) => {
                                    if (page?.data?.data.length) {
                                        page.data.data = page.data?.data.map((msg: MessageProxy) => {
                                            if (msg.id === data.messageId) return { ...msg, text: data.text, is_edited: true };
                                            return msg;
                                        });
                                    }
                                });
                            }
                        });
                    });
                },
            }
        );
    }

    handleDeleteMessage() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { messageIds: number[]; fromAll: boolean; chatId: number }) =>
                axiosClient.delete(`${this.pathPrefix}/${data.chatId}/messages`, { data: { fromAll: data.fromAll, messageIds: data.messageIds } }),
            {
                onMutate: async (data) => {
                    queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                        return produce(cacheData, (draft: any) => {
                            if (draft?.pages?.length) {
                                draft?.pages.forEach((page: any) => {
                                    if (page?.data?.data.length) {
                                        page.data.data = page.data?.data.filter((msg: MessageProxy) => !data?.messageIds?.includes(msg.id));
                                    }
                                });
                            }
                        });
                    });
                },
            }
        );
    }

    handleReadMessage() {
        const queryClient = useQueryClient();
        return {
            mutate: (data: { chat_id: number; message_id: number }) => {
                const log_id = getRandomString(10);
                console.log('отправка MessageRead', log_id, `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
                data.message_id && this.socket.sendMessage('MessageRead', { ...data, log_id });
                queryClient.setQueryData(['get-messages', data.chat_id], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft?.pages?.forEach((page: any) => {
                            page?.data?.data.forEach((msg: any) => {
                                if (msg.id <= data.message_id) {
                                    msg.is_read = true;
                                }
                            });
                        });
                    });
                });
            },
        };
    }

    handleAddDraft = () => {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { text: string; chatId: number; reply_to_message_id?: number }) => axiosClient.post(`${this.pathPrefix}/${data.chatId}/draft`, data),
            {
                onMutate: async (data) => {},
                onSuccess: (data, variables) => {
                    queryClient.invalidateQueries(['get-chat', variables.chatId]);
                },
            }
        );
    };

    handleMessageTyping = () => {
        return {
            mutate: (data: { chatId: number }) => ({
                mutate: this.socket.sendMessage('Typing', { chat_id: data.chatId }),
            }),
        };
    };

    handleSendReaction() {
        return useMutation((data: { chatId: number; messageId: number; reaction: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/message/${data.messageId}`, { reaction: data.reaction })
        );
    }
}

export default new MessageApi();
