import { useQuery } from '@tanstack/react-query';

import { storage } from 'entities/app';
import { axiosClient } from 'shared/configs';
import { useWebSocket } from 'shared/hooks';
import { httpHandlers } from 'shared/lib';

import { Chat } from './types';

class ChatApi {
    pathPrefix = '/api/v2/chats';

    socket = useWebSocket<any, 'ChatListenersUpdated'>();

    handleGetChat = (data: { chatId: number | undefined }) => {
        return useQuery(['get-chat', data.chatId], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}`), {
            staleTime: Infinity,
            enabled: !!data.chatId,
            select: (data) => {
                return httpHandlers.response<{ data: Chat }>(data);
            },
        });
    };

    handleGetChats = () => {
        return useQuery(['get-chats'], () => axiosClient.get(this.pathPrefix, { params: { limit: 100 } }), {
            staleTime: Infinity,
            select: (data) => {
                return httpHandlers.response<{ data: Chat[] }>(data);
            },
        });
    };

    handleSubscribeToChat() {
        return {
            mutate: (chatId: number) => {
                storage.localStorageSet('subscribed_to_chat', chatId);
                this.socket.sendMessage('ChatListenersUpdated', {
                    sub: chatId,
                });
            },
        };
    }

    handleUnsubscribeFromChat() {
        return {
            mutate: (chatId: number) => {
                storage.localStorageRemove('subscribed_to_chat');
                this.socket.sendMessage('ChatListenersUpdated', {
                    unsub: chatId,
                });
            },
        };
    }
}

export default new ChatApi();
