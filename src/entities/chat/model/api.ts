import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

import { axiosClient } from 'shared/configs';
import { useWebSocket, useStorage, useRouter } from 'shared/hooks';
import { getFormData, httpHandlers } from 'shared/lib';

import { Chat, SocketIn, SocketOut } from './types';
import { Company } from '../../company/model/types';
import { MessageType, MediaContentType, File } from '../../message/model/types';
import { chatTypes } from '../index';
import { chats_limit } from '../lib/constants';

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

    handleGetPrivateChat = (data: { userId: number | undefined }) => {
        return useQuery(['get-private-chat', data.userId], () => axiosClient.get(`${this.pathPrefix}/chat/with-user/${data.userId}`), {
            staleTime: Infinity,
            enabled: !!data.userId,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat }>(data);
                return res.data?.data;
            },
        });
    };

    handleGetChats = (data: { type: 'all' | 'personal' | 'company'; companyId?: number }) => {
        const type = data.type === 'company' ? `for-company/${data.companyId}` : data.type || 'all';
        return useQuery(['get-chats', type], () => axiosClient.get(`${this.pathPrefix}/${type}`, { params: { per_page: chats_limit } }), {
            enabled: data.type !== 'company' && !data.companyId,
            staleTime: Infinity,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat[] }>(data);
                return res.data?.data;
            },
        });
    };

    handleCreatePersonalChat() {
        const queryClient = useQueryClient();
        return useMutation((data: { user_ids: number[] | string[] | null; is_group: boolean }) => axiosClient.post(`${this.pathPrefix}`, data), {
            onSuccess: async (res, data) => {
                const updRes = httpHandlers.response<{ data: Chat }>(res);
                queryClient.setQueryData(['get-chats', 'all'], (cacheData: any) => {
                    return produce(cacheData, (draft: any) => {
                        draft?.data?.data.unshift(updRes.data?.data);
                    });
                });
            },
        });
    }

    handleCreateCompanyChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { employee_ids: number[] | string[] | null; companyId: number; is_group: boolean }) =>
                axiosClient.post(`${this.pathPrefix}/for-company/${data.companyId}`, data),
            {
                onSuccess: async (res, data) => {
                    const updRes = httpHandlers.response<{ data: Chat }>(res);
                    queryClient.setQueryData(['get-chats', 'all'], (cacheData: any) => {
                        return produce(cacheData, (draft: any) => {
                            draft?.data?.data.unshift(updRes.data?.data);
                        });
                    });
                },
            }
        );
    }

    handleDeleteChat() {
        const queryClient = useQueryClient();
        const { navigate } = useRouter();
        return useMutation((data: { chatId: number }) => axiosClient.delete(`${this.pathPrefix}/${data.chatId}`), {
            onSuccess: async (res, data) => {
                queryClient.setQueryData(['get-chats', 'all'], (cacheData: any) => {
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
        return useQuery(['get-chat-files', data.chatId, data?.filesType], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/files/${data.filesType}`), {
            staleTime: Infinity,
            enabled: !!data.filesType,
            select: (data) => {
                const res = httpHandlers.response<{ data: File[] }>(data);
                return res.data?.data;
            },
        });
    };

    handleAddAvatar() {
        return useMutation((data: { chatId: number; img: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/avatar`, getFormData('images', data.img))
        );
    }

    handleUpdateChatName() {
        const queryClient = useQueryClient();
        return useMutation((data: { chatId: number; name: string }) => axiosClient.patch(`${this.pathPrefix}/${data.chatId}/name`, { name: data.name }), {
            onSuccess: async (data) => {},
        });
    }

    handleLeaveChat() {
        const queryClient = useQueryClient();
        return useMutation((data: { chatId: number }) => axiosClient.patch(`${this.pathPrefix}/${data.chatId}/exit`), {
            onSuccess: async (res, data) => {
                queryClient.setQueryData(['get-chats', 'all'], (cacheData: any) => {
                    if (!cacheData?.data?.data.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.data.data = draft?.data?.data.filter((chat: chatTypes.Chat) => chat.id !== data.chatId);
                    });
                });
            },
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
