import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { useWebSocket } from 'shared/hooks';

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
                    draft.pages[0].data.data.map((i: MessageProxy, index: number) => {
                        if (socketData.data.message.author.id === viewerId) {
                            if (i.isMock) {
                                const { files } = draft.pages[0].data.data[index];
                                draft.pages[0].data.data.splice(index, 1, { ...socketData.data.message, files });
                            }
                        } else {
                            draft.pages[0].data.data.unshift({ ...socketData.data.message, is_read: socketData.data.extra_info.is_read });
                        }
                    });
                });
            });
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = draft?.data?.data.map((chat: Chat) => {
                        if (socketData.data.message.chat_id === chat.id) return { ...chat, last_message: socketData.data.message };
                        return chat;
                    });
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
