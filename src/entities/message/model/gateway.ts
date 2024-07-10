import { QueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { unstable_batchedUpdates } from 'react-dom';

import { useThrottle, useStorage } from 'shared/hooks';

import { MessageProxy, Socket } from './types';
import debounce from '../../../shared/lib/debounce';
import { appStore } from '../../app';
import { chatService } from '../../chat';
import { Chat } from '../../chat/model/types';
import { viewerService, viewerStore } from '../../viewer';
import { Session } from '../../viewer/model/types';
import messageProxy from '../lib/proxy';
import messageService from '../lib/service';

const [throttleMessageTyping] = useThrottle((cl) => cl(), 1000);

const debounceMessageTypingClose = debounce((cl) => cl(), 3000);

function messageGateway({ event, data }: Socket, queryClient: QueryClient) {
    const viewerId = viewerStore.getState().viewer.value.id;
    const session = viewerStore.getState().session.value;

    switch (event) {
        case 'MessageCreated':
            queryClient.setQueryData(['get-messages', data.message.chat_id], (cacheData: any) => {
                if (!data.extra_info.is_read && data.message && !data.extra_info.muted) {
                    const proxy: MessageProxy = messageProxy({ message: data.message });
                    messageService.notification(
                        `Новое сообщение от ${data.extra_info.contact_name || proxy.authorName}` || '',
                        proxy.action,
                        !!data.message.author_employee
                    );
                }
                if (!cacheData?.pages.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    if (session && data.extra_info.written_from_session_id !== session.id) {
                        draft.pages[0].data.data.unshift({ ...data.message, is_read: data.extra_info.is_read });
                    } else {
                    }
                });
            });
            ['all', 'personal', `for-company/18`].forEach((i) => queryClient.invalidateQueries(['get-chats', i]));

            queryClient.setQueryData(['get-chat', data.message.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = { ...draft.data.data, typing: '' };
                });
            });
            return queryClient.setQueryData(['get-total-pending-messages'], (cacheData: any) => {
                if (!cacheData?.data?.data || data.extra_info.is_read) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data.total_pending_messages_count = data.extra_info.total_pending_messages_count;
                });
            });
        case 'MessageRead':
            ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.pages.forEach((page: any) => {
                            page.data.data = page?.data?.data.map((chat: Chat) => {
                                if (data.chat_id === chat.id) {
                                    chat.pending_messages_count = data?.extra_info?.chat_pending_messages_count;
                                    if (chat?.last_message && chat?.last_message?.id === data.message_id) {
                                        chat.last_message.users_have_read = [...chat.last_message.users_have_read, data.read_user_id];
                                    }
                                }
                                return chat;
                            });
                        });
                    });
                })
            );
            queryClient.setQueryData(['get-chat', data.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    const chat = draft.data.data;
                    chat.pending_messages_count = data?.extra_info?.chat_pending_messages_count;
                    if (chat.last_message.id === data.message_id) {
                        chat.last_message.users_have_read = [...chat.last_message.users_have_read, data.read_user_id];
                    }
                });
            });
            queryClient.setQueryData(['get-total-pending-messages'], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data.total_pending_messages_count = data?.extra_info?.total_pending_messages_count;
                });
            });
            return queryClient.setQueryData(['get-messages', data.chat_id], (cacheData: any) => {
                if (!cacheData?.pages.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.pages.forEach((page: any) => {
                        page.data.data.forEach((msg: MessageProxy, index: number) => {
                            if (msg.id === data.message_id) {
                                page.data.data[index].users_have_read.push(data.read_user_id);
                            }
                        });
                    });
                });
            });
        case 'MessagesDeleted':
            return ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        if (draft?.pages?.length) {
                            draft?.pages.forEach((page: any) => {
                                if (page?.data?.data.length) {
                                    page.data.data = page.data?.data.filter((msg: MessageProxy) => !data?.messageIds?.includes(msg.id));
                                }
                            });
                        }
                    });
                })
            );
        case 'MessageUpdated':
            return queryClient.invalidateQueries(['get-messages', data.chat_id]);

        case 'LastMessageUpdated':
            return ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft?.pages.forEach((page: any) => {
                            if (page?.data?.data?.length) {
                                page.data.data = page?.data?.data?.map((i: any) => {
                                    if (i.id === data.chat_id) {
                                        return { ...i, last_message: data.extra_info.last_message };
                                    }
                                    return i;
                                });
                            }
                        });
                    });
                })
            );

        case 'Typing':
            const fn = (name: string | null) => {
                const getText = (is_group: boolean) => {
                    return !name ? '' : is_group ? `${name} печатает...` : 'печатает...';
                };

                queryClient.setQueryData(['get-chat', data.chat_id], (cacheData: any) => {
                    if (!cacheData?.data?.data) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.data.data = { ...draft.data.data, typing: getText(draft.data.data.is_group) };
                    });
                });
                ['all', 'personal', `for-company/18`].forEach((i) => {
                    queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                        if (!cacheData?.pages?.length) return cacheData;
                        return produce(cacheData, (draft: any) => {
                            draft.pages.forEach((page: any) => {
                                page.data.data = page?.data?.data.map((chat: Chat) => {
                                    if (data.chat_id === chat.id) {
                                        return { ...chat, typing: getText(chat.is_group) };
                                    }
                                    return chat;
                                });
                            });
                        });
                    });
                });
            };
            debounceMessageTypingClose(() => {
                fn(null);
            });
            throttleMessageTyping(() => {
                if (viewerId !== data.user_id) {
                    fn(data?.extra_info?.contact_name);
                }
            });
    }
}

export default messageGateway;
