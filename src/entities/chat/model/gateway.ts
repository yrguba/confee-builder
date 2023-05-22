import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { socketIo } from 'shared/configs';

import useChatStore from './store';
import { Chat, ChatProxy } from './types';
import chatProxy from '../lib/chat-proxy';

function chatGateway() {
    const queryClient = useQueryClient();
    const setSocketAction = useChatStore.use.setSocketAction();
    const viewerData: any = queryClient.getQueryData(['get-viewer']);
    useEffect(() => {
        socketIo.on('receiveMessage', ({ message }) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                cacheData &&
                    cacheData.data.data.forEach((chat: ChatProxy, index: number) => {
                        if (chat.id === Number(message.chat_id)) {
                            chat.message.splice(0, 1, message);
                            chat.updated_at = message.created_at;
                            if (message.message_status === 'pending' && message.user.id !== viewerData?.data?.data?.id) {
                                chat.pending_messages += 1;
                            }
                            chat.messageAction = '';
                            cacheData.data.data.splice(index, 1);
                            cacheData.data.data.unshift(chat);
                            setSocketAction(`receiveMessage:${chat?.id}:${message.id}`);
                        }
                    });
            });
        });
        socketIo.on('receiveMessageStatus', (data) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                cacheData &&
                    cacheData.data.data.forEach((chat: Chat) => {
                        if (chat.id === Number(data.chat_id)) {
                            chat.pending_messages = data.pending_messages;
                            setSocketAction(`receiveMessageStatus:${new Date().valueOf()}`);
                        }
                    });
                return cacheData;
            });
        });

        socketIo.on('receiveMessageAction', ({ message }) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                cacheData &&
                    cacheData.data.data.forEach((chat: ChatProxy) => {
                        if (chat.id === Number(message.chat_id) && !chat.messageAction) {
                            chat.messageAction = `${message.user.name} ${message.action}`;
                            const un = new Date().valueOf();
                            setSocketAction(`receiveMessageAction:${un}`);
                            setTimeout(() => {
                                chat.messageAction = '';
                                setSocketAction(`reset:${un}`);
                            }, 3000);
                        }
                    });
                return cacheData;
            });
        });

        socketIo.on('receiveChatChanges', async ({ data }) => {
            console.log('receiveChatChanges', data);
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                cacheData &&
                    cacheData.data.data.forEach((chat: Chat, index: number) => {
                        if (chat.id === Number(data.chatId)) {
                            cacheData.data.data[index] = { ...chat, ...data.updatedValues };
                            setSocketAction(`avatar:${chat?.id + chat?.avatar} `);
                        }
                    });
                return cacheData;
            });
        });

        socketIo.on('receiveChat', ({ message }) => {
            console.log('receiveChat', message);
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                cacheData && cacheData.data.data.unshift(message);
                setSocketAction(`addChat:${message?.id}`);
                return cacheData;
            });
        });

        socketIo.on('addedToChat', ({ message }) => {
            console.log('addedToChat', message);
        });
        socketIo.on('removedFromChat', ({ message }) => {
            console.log('removedFromChat', message);
        });
        socketIo.on('deleteChat', (data) => {
            console.log('deleteChat', data);
        });
    }, []);
}

export default chatGateway;
