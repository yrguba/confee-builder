import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

import { axiosClient } from 'shared/configs';
import { useWebSocket, useStorage } from 'shared/hooks';
import { getFormData, httpHandlers, objectToFormData } from 'shared/lib';

import { Chat, SocketIn, SocketOut } from './types';
import * as MessageTypes from '../../message/model/types';
import { chatService, chatTypes } from '../index';
import { chats_limit } from '../lib/constants';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    storage = useStorage();

    socket = useWebSocket<SocketIn, SocketOut>();

    handleGetChat = (data: { chatId: number | string | undefined }) => {
        return useQuery(['get-chat', Number(data.chatId)], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            enabled: !!Number(data.chatId),
            select: (res) => {
                return res;
            },
        });
    };

    handleGetChatWithUser = (data: { userId: number | string | undefined }) => {
        return useQuery(['get-chat-with-user', data.userId], () => axiosClient.get(`${this.pathPrefix}/chat/with-user/${data.userId}`), {
            staleTime: Infinity,
            enabled: !!data.userId,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat }>(data);
                return res.data?.data;
            },
        });
    };

    handleSearchChat = (data: { pattern: string | undefined; type: 'all' | 'personal' | 'company' | undefined; companyId?: number }) => {
        const getPath = () => {
            if (data.type === 'all') return '';
            if (data.type === 'personal') return '/contacts';
            if (data.type === 'company' && data.companyId) return `/company/${data.companyId}`;
        };

        const path = getPath();

        return useQuery([path, data.pattern], () => axiosClient.get(`/api/v2/search/chats${path}/${data.pattern}`), {
            staleTime: Infinity,
            enabled: !!data.pattern && !!data.type,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat[] }>(data);
                return res.data?.data;
            },
        });
    };

    handleGetChatWithEmployee = (data: { employeeId: number | string | undefined }) => {
        return useQuery(['get-chat-with-user', data.employeeId], () => axiosClient.get(`${this.pathPrefix}/chat/with-employee/${data.employeeId}`), {
            staleTime: Infinity,
            enabled: !!data.employeeId,
            select: (data) => {
                const res = httpHandlers.response<{ data: Chat }>(data);
                return res.data?.data;
            },
        });
    };

    chatPagination = {
        getPreviousPageParam: (lastPage: any, pages: any) => {
            const { current_page } = lastPage?.data?.meta;
            return current_page > 1 ? current_page - 1 : undefined;
        },
        getNextPageParam: (lastPage: any, pages: any) => {
            const { current_page, last_page } = lastPage?.data?.meta;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        select: (data: any) => {
            return {
                pages: data.pages,
                pageParams: [...data.pageParams],
            };
        },
    };

    handleGetAllChats = () => {
        return useInfiniteQuery(
            ['get-chats', `all`],
            async ({ pageParam }) => axiosClient.get(`${this.pathPrefix}/all`, { params: { per_page: chats_limit, page: pageParam || 0 } }),
            { staleTime: Infinity, ...this.chatPagination }
        );
    };

    handleGetPersonalChats = () => {
        return useInfiniteQuery(
            ['get-chats', 'personal'],
            async ({ pageParam }) => axiosClient.get(`${this.pathPrefix}/personal`, { params: { per_page: chats_limit, page: pageParam || 0 } }),
            { staleTime: Infinity, ...this.chatPagination }
        );
    };

    handleGetCompanyChats = (data: { companyId?: number }) => {
        return useInfiniteQuery(
            ['get-chats', `for-company/${data.companyId}`],
            async ({ pageParam }) =>
                axiosClient.get(`${this.pathPrefix}/for-company/${data.companyId}`, { params: { per_page: chats_limit, page: pageParam || 0 } }),
            { enabled: !!data.companyId, staleTime: Infinity, ...this.chatPagination }
        );
    };

    handleCreatePersonalChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { user_ids: number[] | string[] | null; is_group: boolean; name?: string; avatar?: File | null; description?: string }) => {
                const fd = objectToFormData(data);
                return axiosClient.post(`${this.pathPrefix}`, fd);
            },
            {
                onSuccess: (res, data) => {
                    const updRes = httpHandlers.response<{ data: Chat }>(res);
                    ['all', 'personal'].forEach((i) =>
                        queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                            if (!cacheData?.pages?.length) return cacheData;
                            return produce(cacheData, (draft: any) => {
                                draft?.pages.forEach((page: any) => {
                                    page?.data?.data.unshift(updRes.data?.data);
                                });
                            });
                        })
                    );
                    return updRes;
                },
            }
        );
    }

    handleAddMembersPersonalChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { chatId: number | string; user_ids: number[] | string[] | null }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/add-members`, data),
            {
                onSuccess: async (res, data) => {
                    const updRes = httpHandlers.response<{ data: Chat }>(res);
                    queryClient.setQueryData(['get-chat', updRes.data?.data.id], (cacheData: any) => {
                        cacheData.data.data = updRes.data?.data;
                    });
                },
            }
        );
    }

    handleAddMembersCompanyChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { chatId: number | string; employee_ids: number[] | string[] | null }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/for-company/add-members`, data),
            {
                onSuccess: async (res, data) => {
                    const updRes = httpHandlers.response<{ data: Chat }>(res);
                    queryClient.setQueryData(['get-chat', updRes.data?.data.id], (cacheData: any) => {
                        cacheData.data.data = updRes.data?.data;
                    });
                },
            }
        );
    }

    handlePin() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { chatId: number | string; action: 'pin' | 'unpin'; all: boolean; companyId: number | null }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/${data.action}`, { all: data.all }),
            {
                onSuccess: async (res, data) => {
                    ['personal', 'all', `for-company/${data.companyId}`].forEach((path) => queryClient.invalidateQueries(['get-chats', path]));
                },
            }
        );
    }

    handleUpdateChatDescription() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { chatId: number | string; description: string }) => axiosClient.post(`${this.pathPrefix}/${data.chatId}/description `, data),
            {
                onSuccess: async (res, data) => {
                    queryClient.setQueryData(['get-chat', data.chatId], (cacheData: any) => {
                        cacheData.data.data.description = data.description;
                    });
                },
            }
        );
    }

    handleCreateCompanyChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: {
                body: { employee_ids: number[] | string[] | null; is_group: boolean; name?: string; avatar?: File | null; description?: string };
                companyId: any;
            }) => {
                const fd = objectToFormData(data.body);
                return axiosClient.post(`${this.pathPrefix}/for-company/${data.companyId}`, fd);
            },
            {
                onSuccess: async (res, data) => {
                    const updRes = httpHandlers.response<{ data: Chat }>(res);
                    ['all', `for-company/${data.companyId}`].forEach((i) =>
                        queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                            if (!cacheData?.pages?.length) return cacheData;
                            return produce(cacheData, (draft: any) => {
                                draft?.pages.forEach((page: any) => {
                                    page?.data?.data.unshift(updRes.data?.data);
                                });
                            });
                        })
                    );
                },
            }
        );
    }

    handleDeleteChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { type: 'personal' | 'company'; chatId: number; companyId?: string }) => axiosClient.delete(`${this.pathPrefix}/${data.chatId}`),
            {
                onSuccess: async (res, data) => {
                    const type = data.type === 'company' ? `for-company/${data.companyId}` : data.type;
                    ['all', type].forEach((i) =>
                        queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                            if (!cacheData?.pages?.length) return cacheData;
                            return produce(cacheData, (draft: any) => {
                                draft?.pages.forEach((page: any) => {
                                    page.data.data = page?.data?.data.filter((chat: chatTypes.Chat) => chat.id !== data.chatId);
                                });
                            });
                        })
                    );
                },
            }
        );
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

    handleGetChatFiles = (data: { chatId?: number | undefined; filesType?: MessageTypes.MediaContentType | null }) => {
        return useQuery(['get-chat-files', data.chatId, data?.filesType], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/files/${data.filesType}`), {
            enabled: !!data.filesType && !!data.chatId,
            select: (data) => {
                const res = httpHandlers.response<{ data: MessageTypes.File[] }>(data);
                return res.data?.data;
            },
        });
    };

    handleGetAvatars = (data: { chatId: number }) => {
        return useQuery(['get-chat-avatars', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/avatars`), {
            staleTime: Infinity,
            enabled: !!data.chatId,
            select: (data) => {
                const res = httpHandlers.response<{ data: { avatars: string[] } }>(data);
                return res.data?.data.avatars;
            },
        });
    };

    handleAddAvatar() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { chatId: number; img: File }) => {
                return axiosClient.post(`${this.pathPrefix}/${data.chatId}/avatar`, getFormData('images', data.img));
            },
            {
                onSuccess: (data, variables, context) => {
                    queryClient.invalidateQueries(['get-chat', variables.chatId]);
                },
            }
        );
    }

    handleUpdateChatName() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { chatId: number; name: string; type: 'personal' | 'company'; companyId?: string }) =>
                axiosClient.patch(`${this.pathPrefix}/${data.chatId}/name`, { name: data.name }),
            {
                onSuccess: async (res, data) => {
                    const type = data.type === 'company' ? `for-company/${data.companyId}` : data.type;
                    ['all', type].forEach((i) =>
                        queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                            if (!cacheData?.pages?.length) return cacheData;
                            return produce(cacheData, (draft: any) => {
                                draft?.pages.forEach((page: any) => {
                                    page.data.data = page?.data?.data.map((chat: Chat) => {
                                        if (data.chatId === chat.id) {
                                            return { ...chat, name: data.name };
                                        }
                                        return chat;
                                    });
                                });
                            });
                        })
                    );
                    queryClient.setQueryData(['get-chat', data?.chatId], (cacheData: any) => {
                        if (!cacheData?.data?.data) return cacheData;
                        return produce(cacheData, (draft: any) => {
                            draft.data.data = { ...draft.data.data, name: data.name };
                        });
                    });
                },
            }
        );
    }

    handleLeaveChat() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { type: 'company' | 'personal'; chatId: number; companyId?: string }) => axiosClient.patch(`${this.pathPrefix}/${data.chatId}/exit`),
            {
                onSuccess: async (res, data) => {
                    const type = data.type === 'company' ? `for-company/${data.companyId}` : data.type;
                    ['all', type].forEach((i) => {
                        queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                            if (!cacheData?.pages?.length) return cacheData;
                            return produce(cacheData, (draft: any) => {
                                draft?.pages.forEach((page: any) => {
                                    page.data.data = page?.data?.data.filter((chat: chatTypes.Chat) => chat.id !== data.chatId);
                                });
                            });
                        });
                    });
                },
            }
        );
    }

    handleRemoveMemberFromPersonal() {
        const queryClient = useQueryClient();
        return useMutation((data: { user_ids: number[]; chatId: number }) => axiosClient.post(`${this.pathPrefix}/${data.chatId}/remove-members`, data), {
            onSuccess: async (res, data) => {
                queryClient.invalidateQueries(['get-chat', data.chatId]);
            },
        });
    }

    handleChatMute() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { value: boolean; chatId: number; companyId: number | null }) =>
                axiosClient.post(`${this.pathPrefix}/${data.chatId}/mute`, {}, { params: { mute: data.value ? 1 : 0 } }),
            {
                onMutate: (data) => {
                    chatService.forEachChats(queryClient, data.companyId, (chats) => {
                        const foundChatIndex = chats?.findIndex((i: Chat) => data.chatId === i.id);
                        if (foundChatIndex !== -1) {
                            chats[foundChatIndex].is_muted = data.value;
                        }
                    });
                    console.log(data.chatId);
                    queryClient.setQueryData(['get-chat', data.chatId], (cacheData: any) => {
                        return produce(cacheData, (draft: any) => {
                            if (draft?.data?.data) {
                                draft.data.data.is_muted = data.value;
                            }
                        });
                    });
                },
            }
        );
    }

    handleRemoveMemberFromCompany() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { employee_ids: number[]; chatId: number }) => {
                return axiosClient.post(`${this.pathPrefix}/${data.chatId}/for-company/remove-members`, data);
            },
            {
                onSuccess: async (res, data, e) => {
                    queryClient.invalidateQueries(['get-chat', data.chatId]);
                },
            }
        );
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
