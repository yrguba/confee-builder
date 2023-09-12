import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { useWebSocket, useThrottle } from 'shared/hooks';
import { findLastIndex } from 'shared/lib';

import { MessageProxy, SocketIn, SocketOut } from './types';
import { useChatStore } from '../../chat';
import { Chat } from '../../chat/model/types';
import { viewerService } from '../../viewer';

const [throttleMessageTyping] = useThrottle((cl) => cl(), 5000);

function messageGateway() {
    const viewerId = viewerService.getId();
    const chatSubscription = useChatStore.use.chatSubscription();
    const queryClient = useQueryClient();
    useEffect(() => {
        const { onMessage } = useWebSocket<SocketIn, SocketOut>();
        onMessage('MessageCreated', (socketData) => {
            queryClient.setQueryData(['get-messages', socketData.data.message.chat_id], (cacheData: any) => {
                if (!cacheData?.pages.length) return cacheData;
                if (socketData.data.message.author.id === viewerId || chatSubscription === socketData.data.message.chat_id) {
                    socketData.data.message.is_read = true;
                }
                return produce(cacheData, (draft: any) => {
                    if (
                        socketData.data.message.author.id === viewerId &&
                        socketData.data.message.type !== 'system' &&
                        !socketData.data.message.forwarded_from_message
                    ) {
                        if (socketData.data.message?.files?.length) {
                            const foundMockIndex = draft.pages[0].data.data.findIndex((i: MessageProxy) => i.isMock && socketData.data.message.type === i.type);
                            if (foundMockIndex === -1) return;
                            const { files } = draft.pages[0].data.data[foundMockIndex];
                            draft.pages[0].data.data.splice(foundMockIndex, 1, {
                                ...socketData.data.message,
                                is_read: socketData.data.extra_info.is_read,
                                files,
                            });
                        } else {
                            const foundMockIndex = findLastIndex(draft.pages[0].data.data, (i: MessageProxy) => i.isMock);
                            if (foundMockIndex === -1) return;
                            draft.pages[0].data.data.splice(foundMockIndex, 1, {
                                ...socketData.data.message,
                                is_read: socketData.data.extra_info.is_read,
                            });
                        }
                    } else {
                        draft.pages[0].data.data.unshift({ ...socketData.data.message, is_read: socketData.data.extra_info.is_read });
                    }
                });
            });
            ['all', 'personal'].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft?.pages.forEach((page: any) => {
                            const foundChatIndex = page.data?.data?.findIndex((i: Chat) => socketData.data.message.chat_id === i.id);
                            if (foundChatIndex !== -1) {
                                const chat = page?.data?.data[foundChatIndex];
                                page.data.data.splice(foundChatIndex, 1);
                                page.data.data.unshift({
                                    ...chat,
                                    pending_messages_count: socketData.data.extra_info.chat_pending_messages_count,
                                    last_message: socketData.data.message,
                                    typing: '',
                                });
                            }
                        });
                    });
                })
            );

            queryClient.setQueryData(['get-chat', socketData.data.message.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = { ...draft.data.data, typing: '' };
                });
            });
            queryClient.setQueryData(['get-total-pending-messages'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = socketData.data.extra_info.total_pending_messages_count;
                });
            });
        });
        onMessage('MessageUpdated', (socketData) => {
            ['all', 'personal'].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.pages.forEach((page: any) => {
                            page.data.data = page?.data?.data.map((chat: Chat) => {
                                if (socketData.data.chat_id === chat.id && chat.last_message.id === socketData.data.message_id)
                                    return { ...chat, last_message: { ...chat.last_message, ...socketData.data.updated_values } };
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
                                page.data.data[index] = { ...msg, ...socketData.data.updated_values };
                            }
                            if (msg.reply_to_message?.id === socketData.data.message_id) {
                                page.data.data[index] = { ...msg, reply_to_message: { ...msg.reply_to_message, ...socketData.data.updated_values } };
                            }
                        });
                    });
                });
            });
        });
        onMessage('MessageRead', (socketData) => {
            ['all', 'personal'].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft.pages.forEach((page: any) => {
                            page.data.data = page?.data?.data.map((chat: Chat) => {
                                if (socketData.data.chat_id === chat.id) {
                                    chat.pending_messages_count = socketData?.data?.extra_info?.chat_pending_messages_count;
                                    if (chat.last_message.id === socketData.data.message_id) {
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
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = socketData?.data?.extra_info?.total_pending_messages_count;
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
        // onMessage('Typing', (socketData) => {
        //     // console.log(socketData);
        //     // if(viewerId === socketData)
        //     const fn = (text: string) => {
        //         queryClient.setQueryData(['get-chat', socketData.data.chat_id], (cacheData: any) => {
        //             if (!cacheData?.data?.data) return cacheData;
        //             return produce(cacheData, (draft: any) => {
        //                 draft.data.data = { ...draft.data.data, typing: text };
        //             });
        //         });
        //         queryClient.setQueryData(['get-chats', 'all'], (cacheData: any) => {
        //             if (!cacheData?.data?.data?.length) return cacheData;
        //             return produce(cacheData, (draft: any) => {
        //                 draft.data.data = draft?.data?.data.map((chat: Chat) => {
        //                     if (socketData.data.chat_id === chat.id) {
        //                         return { ...chat, typing: text };
        //                     }
        //                     return chat;
        //                 });
        //             });
        //         });
        //     };
        //     throttleMessageTyping(() => {
        //         fn('пользователь печатает...');
        //         setTimeout(() => fn(''), 5000);
        //     });
        // });
    }, []);
}

export default messageGateway;
