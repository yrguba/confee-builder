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
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = draft?.data?.data.map((chat: Chat) => {
                        if (socketData.data.chat_id === chat.id) return { ...chat, ...socketData.data.updated_values };
                        return chat;
                    });
                });
            });
            queryClient.setQueryData(['get-chat', socketData.data.chat_id], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    draft.data.data = { ...draft.data.data, ...socketData.data.updated_values };
                });
            });
        });
        onMessage('ChatCreated', (socketData) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data) return cacheData;
                return produce(cacheData, (draft: any) => {
                    const foundChat = draft.data.data.find((i: ChatProxy) => i.id === socketData.data.chat.id);
                    !foundChat && draft.data.data.unshift(socketData.data.chat);
                });
            });
        });
        onMessage('ChatDeleted', (socketData) => {
            const openChatId = ChatService.getOpenChatId();
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                if (!cacheData?.data?.data.length) return cacheData;
                if (Number(openChatId) === socketData.data.chat_id) {
                    navigate('/chats');
                }
                return produce(cacheData, (draft: any) => {
                    draft.data.data = draft.data.data.filter((chat: ChatProxy) => chat.id !== socketData.data.chat_id);
                });
            });
        });
    }, []);
}

export default chatGateway;
