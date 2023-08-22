import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

import { axiosClient } from 'shared/configs';
import { useWebSocket, useStorage, useRouter } from 'shared/hooks';
import { httpHandlers } from 'shared/lib';

import { Chat, SocketIn, SocketOut } from './types';
import { MessageType, MediaContentType, File } from '../../message/model/types';
import { chatTypes } from '../index';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    storage = useStorage();

    socket = useWebSocket<SocketIn, SocketOut>();

    handleGetChat = (data: { chatId: number | undefined }) => {
        return useQuery(['get-chat', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            enabled: !!data.chatId,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat }>(data);
                return res.data?.data;
            },
        });
    };

    handleGetChats = () => {
        return useQuery(['get-chats'], () => axiosClient.get(this.pathPrefix, { params: { per_page: 100 } }), {
            staleTime: Infinity,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat[] }>(data);
                return res.data?.data;
            },
        });
    };

    handleCreateChat() {
        const queryClient = useQueryClient();
        return useMutation((data: { user_ids: number[] | string[] | null; is_group: boolean }) => axiosClient.post(`${this.pathPrefix}`, data), {
            onSuccess: async (res, data) => {
                const updRes = httpHandlers.response<{ data: Chat }>(res);
                queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                    return produce(cacheData, (draft: any) => {
                        draft.data.data.unshift(updRes.data?.data);
                    });
                });
            },
        });
    }

    handleDeleteChat() {
        const queryClient = useQueryClient();
        const { navigate } = useRouter();
        return useMutation((data: { chatId: number }) => axiosClient.delete(`${this.pathPrefix}/${data.chatId}`), {
            onSuccess: async (res, data) => {
                queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                    if (!cacheData?.data?.data.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.data.data = draft?.data?.data.filter((chat: chatTypes.Chat) => chat.id !== data.chatId);
                    });
                });
                navigate('/chat');
            },
        });
    }

    handleGetTotalPendingMessages = () => {
        return useQuery(['get-total-pending-messages'], () => axiosClient.get(`${this.pathPrefix}/total-pending-messages`), {
            staleTime: Infinity,
            select: (data) => {
                const res = httpHandlers.response<{ data: { total_pending_messages_count: number } }>(data);
                return res.data?.data?.total_pending_messages_count;
            },
        });
    };

    handleGetChatFiles = (data: { chatId: number; filesType: MediaContentType | null }) => {
        return useQuery(['get-chat-files', data.chatId, data.filesType], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/files/${data.filesType}`), {
            staleTime: Infinity,
            enabled: !!data.filesType,
            select: (data) => {
                const res = httpHandlers.response<{ data: File[] }>(data);
                return res.data?.data;
            },
        });
    };

    handleAddAvatar() {
        const queryClient = useQueryClient();
        return useMutation((data: { chatId: number; file: FormData | null }) => axiosClient.post(`${this.pathPrefix}/${data.chatId}/avatar'`, data.file), {
            // onSuccess: async (data) => {
            //     queryClient.invalidateQueries(['get-viewer']);
            // },
        });
    }

    handleSubscribeToChat() {
        return {
            mutate: (chatId: number | null) => {
                this.socket.sendMessage('ChatListenersUpdated', {
                    sub: chatId,
                });
            },
        };
    }

    handleUnsubscribeFromChat() {
        return {
            mutate: (chatId: number) => {
                this.socket.sendMessage('ChatListenersUpdated', {
                    unsub: chatId,
                });
            },
        };
    }
}

export default new ChatApi();
