import { useQueryClient } from '@tanstack/react-query';
import { sendNotification } from '@tauri-apps/api/notification';
import produce from 'immer';
import { useEffect } from 'react';

import { useWebSocket, useThrottle, useDebounce, useStorage } from 'shared/hooks';
import { findLastIndex } from 'shared/lib';

import { Message, MessageProxy, SocketIn, SocketOut } from './types';
import debounce from '../../../shared/lib/debounce';
import { Notification } from '../../../shared/ui';
import { chatService } from '../../chat';
import { Chat } from '../../chat/model/types';
import { viewerService } from '../../viewer';
import { Session } from '../../viewer/model/types';
import messageProxy from '../lib/proxy';
import messageService from '../lib/service';

const [throttleMessageTyping] = useThrottle((cl) => cl(), 1000);
const [throttlePushNotification] = useThrottle((cl) => cl(), 500);
const debounceMessageTypingClose = debounce((cl) => cl(), 3000);

function messageGateway() {
    const viewerId = viewerService.getId();
    const queryClient = useQueryClient();
    const session = useStorage().get<Session>('session');
    useEffect(() => {
        const { onMessage } = useWebSocket<SocketIn, SocketOut>();
        onMessage('MessageCreated', (socketData) => {
            console.log(socketData);
            queryClient.setQueryData(['get-messages', socketData.data.message.chat_id], (cacheData: any) => {
                if (!socketData.data.extra_info.is_read && socketData.data.message && !socketData.data.extra_info.muted) {
                    const proxy: MessageProxy = messageProxy({ message: socketData.data.message });
                    throttlePushNotification(() =>
                        messageService.notification(`Новое сообщение от ${socketData.data.extra_info.contact_name || proxy.authorName}` || '', proxy.action)
                    );
                }
                if (!cacheData?.pages.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    if (session && socketData.data.extra_info.written_from_session_id !== session.id) {
                        draft.pages[0].data.data.unshift({ ...socketData.data.message, is_read: socketData.data.extra_info.is_read });
                    } else {
                    }
                });
            });
            chatService.forEachChats(queryClient, 18, (chats) => {
                const foundChatIndex = chats?.findIndex((i: Chat) => socketData.data.message.chat_id === i.id);
                const lastPinnedChatIndex = chats?.findIndex((i: Chat) => i.chat_pinned);
                if (foundChatIndex !== -1) {
                    const chat = chats[foundChatIndex];
                    chats.splice(foundChatIndex, 1);
                    chats.splice(lastPinnedChatIndex + 1, 0, {
                        ...chat,
                        pending_messages_count: socketData.data.extra_info.is_read
                            ? chat.pending_messages_count
                            : socketData.data.extra_info.chat_pending_messages_count,
                        last_message: socketData.data.message,
                        typing: '',
                    });
                }
            });
            queryClient.setQueryData(['get-chat', socketData.data.message.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = { ...draft.data.data, typing: '' };
                });
            });
            queryClient.setQueryData(['get-total-pending-messages'], (cacheData: any) => {
                if (!cacheData?.data?.data || socketData.data.extra_info.is_read) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data.total_pending_messages_count = socketData.data.extra_info.total_pending_messages_count;
                });
            });
        });
        onMessage('MessagesDeleted', (socketData) => {
            queryClient.setQueryData(['get-messages', socketData.data.chat_id], (cacheData: any) => {
                return produce(cacheData, (draft: any) => {
                    draft?.pages?.forEach((page: any) => {
                        page.data.data = page?.data?.data.filter((message: Message) => !socketData.data.message_ids.includes(message.id));
                    });
                });
            });
        });
        onMessage('MessageUpdated', (socketData) => {
            ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.pages.forEach((page: any) => {
                            page.data.data = page?.data?.data.map((chat: Chat) => {
                                if (socketData.data.chat_id === chat.id && chat?.last_message?.id === socketData.data.message_id)
                                    return { ...chat, last_message: { ...chat.last_message, ...socketData.data.extra_info.updated_values } };
                                return chat;
                            });
                        });
                    });
                })
            );
            queryClient.setQueryData(['get-messages', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData?.pages.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.pages.forEach((page: any) => {
                        page.data.data.forEach((msg: MessageProxy, index: number) => {
                            if (msg.id === socketData.data.message_id) {
                                page.data.data[index] = { ...msg, ...socketData.data.extra_info.updated_values };
                            }
                            if (msg.reply_to_message?.id === socketData.data.message_id) {
                                page.data.data[index] = { ...msg, reply_to_message: { ...msg.reply_to_message, ...socketData.data.extra_info.updated_values } };
                            }
                        });
                    });
                });
            });
        });
        onMessage('MessageRead', (socketData) => {
            ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.pages.forEach((page: any) => {
                            page.data.data = page?.data?.data.map((chat: Chat) => {
                                if (socketData.data.chat_id === chat.id) {
                                    chat.pending_messages_count = socketData?.data?.extra_info?.chat_pending_messages_count;
                                    if (chat?.last_message && chat?.last_message?.id === socketData.data.message_id) {
                                        chat.last_message.users_have_read = [...chat.last_message.users_have_read, socketData.data.read_user_id];
                                    }
                                }
                                return chat;
                            });
                        });
                    });
                })
            );
            queryClient.setQueryData(['get-chat', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    const chat = draft.data.data;
                    chat.pending_messages_count = socketData?.data?.extra_info?.chat_pending_messages_count;
                    if (chat.last_message.id === socketData.data.message_id) {
                        chat.last_message.users_have_read = [...chat.last_message.users_have_read, socketData.data.read_user_id];
                    }
                });
            });
            queryClient.setQueryData(['get-total-pending-messages'], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data.total_pending_messages_count = socketData?.data?.extra_info?.total_pending_messages_count;
                });
            });
            queryClient.setQueryData(['get-messages', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData?.pages.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.pages.forEach((page: any) => {
                        page.data.data.forEach((msg: MessageProxy, index: number) => {
                            if (msg.id === socketData.data.message_id) {
                                page.data.data[index].users_have_read.push(socketData.data.read_user_id);
                            }
                        });
                    });
                });
            });
        });
        onMessage('Typing', (socketData) => {
            const fn = (name: string | null) => {
                const getText = (is_group: boolean) => {
                    return !name ? '' : is_group ? `${name} печатает...` : 'печатает...';
                };

                queryClient.setQueryData(['get-chat', socketData.data.chat_id], (cacheData: any) => {
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
                                    if (socketData.data.chat_id === chat.id) {
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
                if (viewerId !== socketData.data.user_id) {
                    fn(socketData.data?.extra_info?.contact_name);
                }
            });
        });
    }, []);
}

export default messageGateway;
