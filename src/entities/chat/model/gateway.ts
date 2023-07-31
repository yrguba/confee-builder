import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useWebSocket } from 'shared/hooks';

import { Chat } from './types';

type SocketIn = 'ChatCreated' | 'ChatDeleted' | ' ChatMembersCreated' | 'ChatMembersDeleted' | 'ChatUpdated' | 'ChatPendingMessagesCountUpdated';
type SocketOut = '';

function chatGateway() {
    const { onMessage } = useWebSocket<SocketIn, SocketOut>();
    const queryClient = useQueryClient();
    useEffect(() => {
        onMessage('ChatUpdated', (socketData) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return {
                    ...cacheData,
                    data: {
                        ...cacheData.data,
                        data: cacheData?.data?.data.map((chat: Chat) => {
                            if (socketData.data.chat_id === chat.id) {
                                return { ...chat, ...socketData.data.updated_values };
                            }
                            return chat;
                        }),
                    },
                };
            });
            queryClient.setQueryData(['get-chat', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData.data.data) return cacheData;
                return {
                    ...cacheData,
                    data: {
                        ...cacheData.data,
                        data: { ...cacheData.data.data, ...socketData.data.updated_values },
                    },
                };
            });
        });
        onMessage('ChatCreated', (socketData) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return {
                    ...cacheData,
                    data: {
                        ...cacheData.data.data,
                        data: [socketData.data.chat, ...cacheData.data.data],
                    },
                };
            });
        });
    }, []);
}

export default chatGateway;
