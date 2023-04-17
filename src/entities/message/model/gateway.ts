import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import useMessageStore from './store';
import { Message, MessageProxy } from './types';
import { socketIo } from '../../../shared/configs';

function messageGateway() {
    const queryClient = useQueryClient();
    const setSocketAction = useMessageStore.use.setSocketAction();

    useEffect(() => {
        socketIo.on('receiveMessage', ({ message }) => {
            const viewerData: any = queryClient.getQueryData(['get-viewer']);
            queryClient.setQueryData(['get-messages', Number(message.chat_id)], (cacheData: any) => {
                if (cacheData) {
                    if (message.is_edited) {
                        cacheData.pages.length &&
                            cacheData.pages.forEach((page: any) => {
                                page?.data?.data.forEach((messageInCache: MessageProxy, index: number) => {
                                    if (message?.id === messageInCache?.id) {
                                        page.data.data.splice(index, 1, { ...messageInCache, text: message.text, is_edited: true });
                                    }
                                });
                            });
                    } else {
                        const viewerId = viewerData?.data.data.id;
                        const pageOne = cacheData.pages.find((page: any) => page.data.page === 1);
                        // if (viewerId === message.user.id) {
                        //     pageOne.data.data.find((myMessage: MessageProxy, index: number) => {
                        //         if (myMessage.user?.id === viewerId && myMessage.isMock) {
                        //             pageOne.data.data.splice(index, 1, { ...message, isMy: true });
                        //         }
                        //     });
                        // } else if (pageOne) {
                        pageOne.data.data.unshift(message);
                        // }
                    }
                    setSocketAction(`receiveMessage:${message.id}:${new Date()}`);
                }
                return cacheData;
            });
        });
        socketIo.on('receiveDeleteMessage', ({ chat_id, messages }) => {
            queryClient.setQueryData(['get-messages', chat_id], (cacheData: any) => {
                cacheData &&
                    cacheData.pages.forEach((page: any) => {
                        page.data.data.forEach((message: Message, index: number) => {
                            messages.forEach((deletedMessage: Message) => {
                                if (message.id === deletedMessage.id) {
                                    page.data.data.splice(index, 1);
                                    setSocketAction(`receiveReactions:${message.id}:${new Date()}`);
                                }
                            });
                        });
                    });
                return cacheData;
            });
        });
        socketIo.on('receiveReactions', ({ data }) => {
            queryClient.setQueryData(['get-messages', data.chatId], (cacheData: any) => {
                cacheData.pages.forEach((page: any) => {
                    page.data.data.forEach((message: any) => {
                        if (message.id === data.messageId) {
                            message.reactions = { ...data.reactions };
                            setSocketAction(`receiveReactions:${message.id}:${new Date()}`);
                        }
                    });
                });
                return cacheData;
            });
        });
        socketIo.on('receiveMessageStatus', (data) => {
            queryClient.setQueryData(['get-messages', data.chat_id], (cacheData: any) => {
                cacheData &&
                    cacheData.pages.forEach((page: any) => {
                        page.data.data.forEach((message: Record<string, any>) => {
                            data.messages.forEach((responseMessage: Record<string, any>, index: number) => {
                                if (responseMessage.id === message.id) {
                                    Object.keys(responseMessage).forEach((key) => {
                                        if (key !== 'content') {
                                            message[key] = responseMessage[key];
                                        }
                                    });
                                    message.message_status = responseMessage.message_status;
                                    setSocketAction(`receiveMessageStatus:${message.id}:${responseMessage.id}`);
                                }
                            });
                        });
                    });
                return cacheData;
            });
        });
        socketIo.on('receiveForwardMessage', ({ chat_id, message }) => {
            queryClient.setQueryData(['get-messages', chat_id], (cacheData: any) => {
                if (cacheData) {
                    const pageOne = cacheData.pages.find((page: any) => page.data.page === 1);
                    if (pageOne) {
                        pageOne.data.data.unshift(message);
                    }
                }
                return cacheData;
            });
        });
    }, []);
}

export default messageGateway;
