import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { useRouter, useWebSocket } from 'shared/hooks';

import { Chat, SocketOut, SocketIn, ChatProxy } from './types';
import ChatService from '../lib/service';

function chatGateway() {
    const { navigate } = useRouter();
    const queryClient = useQueryClient();
    useEffect(() => {
        const { onMessage } = useWebSocket<SocketIn, SocketOut>();
        onMessage('ChatUpdated', (socketData) => {
            ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    console.log(socketData.data);
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft?.pages.forEach((page: any) => {
                            page.data.data = page?.data?.data.map((chat: Chat) => {
                                if (socketData.data.chat_id === chat.id) return { ...chat, ...socketData.data.updated_values };
                                return chat;
                            });
                        });
                    });
                })
            );
            queryClient.setQueryData(['get-chat', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = { ...draft.data.data, ...socketData.data.updated_values };
                });
            });
        });
        onMessage('ChatCreated', (socketData) => {
            ['all', 'personal', `for-company/${socketData.data?.chat?.company_id}`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    return produce(cacheData, (draft: any) => {
                        draft?.pages.forEach((page: any) => {
                            const foundChat = page.data.data.find((i: ChatProxy) => i.id === socketData.data.chat.id);
                            !foundChat && page.data.data.unshift(socketData.data.chat);
                        });
                    });
                })
            );
        });
        onMessage('ChatDeleted', (socketData) => {
            const openChatId = ChatService.getOpenChatId();
            ['all', 'personal', `for-company/18`].forEach((i) =>
                queryClient.setQueryData(['get-chats', i], (cacheData: any) => {
                    if (!cacheData?.pages?.length) return cacheData;
                    if (Number(openChatId) === socketData.data.chat_id) {
                        navigate('/chats');
                    }
                    return produce(cacheData, (draft: any) => {
                        draft?.pages.forEach((page: any) => {
                            page.data.data = page.data.data.filter((chat: ChatProxy) => chat.id !== socketData.data.chat_id);
                        });
                    });
                })
            );
        });
        onMessage('ChatMembersDeleted', (socketData) => {
            queryClient.invalidateQueries(['get-chat', socketData.data.chat_id]);
        });
    }, []);
}

export default chatGateway;
