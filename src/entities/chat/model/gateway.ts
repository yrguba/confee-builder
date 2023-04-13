import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import useChatStore from './store';
import { Chat, ChatProxy } from './types';
import { socketIo } from '../../../shared/configs';

function chatGateway() {
    const queryClient = useQueryClient();
    const setSocketAction = useChatStore.use.setSocketAction();
    const viewerData: any = queryClient.getQueryData(['get-viewer']);
    useEffect(() => {
        socketIo.on('receiveMessage', ({ message }) => {
            queryClient.setQueryData(['get-chats'], (cacheData: any) => {
                cacheData &&
                    cacheData.data.data.forEach((chat: ChatProxy) => {
                        if (chat.id === Number(message.chat_id)) {
                            chat.message.splice(0, 1, message);
                            if (message.message_status === 'pending' && message.user.id !== viewerData?.data?.data?.id) {
                                chat.pending_messages += 1;
                            }
                            chat.messageAction = '';
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
                            setSocketAction(`receiveMessageStatus:${chat?.id}`);
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
                            setSocketAction(`receiveMessageAction:${chat?.id}`);
                            setTimeout(() => {
                                chat.messageAction = '';
                                setSocketAction(`reset:${chat?.id}`);
                            }, 3000);
                        }
                    });
                return cacheData;
            });
        });
    }, []);
}

export default chatGateway;
