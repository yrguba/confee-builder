import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { PhotoVideoSwiperModal } from 'features/app';

import { appService, appStore } from '../entities/app';
import { chatApi, chatGateway, chatStore } from '../entities/chat';
import { meetGateway, meetStore, useMeet } from '../entities/meet';
import { messageGateway, messageStore } from '../entities/message';
import { userGateway } from '../entities/user';
import { ForwardMessagesModal } from '../features/message';
import { useEffectOnce, useRecognizeSpeech, useRouter, useRustServer, useStorage, useWebSocket } from '../shared/hooks';
import { Modal } from '../shared/ui';

function Provider({ children }: { children: any }) {
    useRecognizeSpeech();
    const queryClient = useQueryClient();
    const { params, pathname, navigate } = useRouter();
    const ls = useStorage();

    const chatSubscription = chatStore.use.chatSubscription();

    const openForwardMessageModal = messageStore.use.openForwardMessageModal();
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const forwardMessagesModal = Modal.use();
    const photoVideoSwiperModal = Modal.use();

    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    useEffect(() => {
        if (!params.chat_id) {
            chatSubscription.value && handleUnsubscribeFromChat(chatSubscription.value);
            chatSubscription.set(null);
        }
    }, [params.chat_id]);

    useEffect(() => {
        if (pathname === '/') {
            navigate('/chats');
        }
    }, [navigate]);

    useEffectOnce(() => {
        const { onMessage } = useWebSocket();
        onMessage((data) => {
            messageGateway(data, queryClient);
            chatGateway(data, queryClient, navigate);
            userGateway(data, queryClient);
            meetGateway(data, queryClient);
        });
    });

    useEffect(() => {
        if (openForwardMessageModal.value) {
            forwardMessagesModal.open();
        } else {
            forwardMessagesModal.close();
        }
    }, [openForwardMessageModal.value]);

    useEffect(() => {
        if (photoAndVideoFromSwiper.value) {
            photoVideoSwiperModal.open();
        } else {
            photoVideoSwiperModal.close();
        }
    }, [photoAndVideoFromSwiper.value]);

    return (
        <>
            <PhotoVideoSwiperModal {...photoVideoSwiperModal} />
            <ForwardMessagesModal {...forwardMessagesModal} />
            {children}
        </>
    );
}

export default Provider;
