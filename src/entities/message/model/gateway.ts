import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { useWebSocket } from 'shared/hooks';
import { findLastIndex } from 'shared/lib';

import { MessageProxy, SocketIn, SocketOut } from './types';
import { useChatStore } from '../../chat';
import { Chat } from '../../chat/model/types';
import { viewerService } from '../../viewer';

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
                    if (socketData.data.message.author.id !== viewerId) {
                        draft.pages[0].data.data.unshift({ ...socketData.data.message, is_read: socketData.data.extra_info.is_read });
                    } else {
                        const foundMockIndex = findLastIndex(draft.pages[0].data.data, (i: MessageProxy) => i.isMock);
                        const { files } = draft.pages[0].data.data[foundMockIndex];
                        draft.pages[0].data.data.splice(foundMockIndex, 1, { ...socketData.data.message, is_read: socketData.data.extra_info.is_read, files });
                    }
                });
            });
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = draft?.data?.data.map((chat: Chat) => {
                        if (socketData.data.message.chat_id === chat.id) {
                            return {
                                ...chat,
                                pending_messages_count: socketData.data.extra_info.chat_pending_messages_count,
                                last_message: socketData.data.message,
                            };
                        }
                        return chat;
                    });
                });
            });
            queryClient.setQueryData(['get-total-pending-messages'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    console.log(cacheData);
                    draft.data.data = socketData.data.extra_info.total_pending_messages_count;
                });
            });
        });
        onMessage('MessageUpdated', (socketData) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = draft?.data?.data.map((chat: Chat) => {
                        if (socketData.data.chat_id === chat.id && chat.last_message.id === socketData.data.message_id)
                            return { ...chat, last_message: { ...chat.last_message, ...socketData.data.updated_values } };
                        return chat;
                    });
                });
            });
            queryClient.setQueryData(['get-messages', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData?.pages.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.pages.forEach((page: any) => {
                        page.data.data.forEach((msg: MessageProxy, index: number) => {
                            if (msg.id === socketData.data.message_id) {
                                page.data.data[index] = { ...msg, ...socketData.data.updated_values };
                            }
                        });
                    });
                });
            });
        });
    }, []);
}

export default messageGateway;
