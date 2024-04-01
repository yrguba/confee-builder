import { useQueryClient } from '@tanstack/react-query';
import { WebviewWindow } from '@tauri-apps/api/window';
import { set } from 'idb-keyval';
import React, { useEffect } from 'react';

import { appService, appStore } from '../entities/app';
import usePhotoVideoSwiper from '../entities/app/lib/usePhotoVideoSwiper';
import { chatApi, chatGateway, chatStore } from '../entities/chat';
import { meetGateway, meetStore, useMeet } from '../entities/meet';
import { messageGateway, messageStore } from '../entities/message';
import { userGateway } from '../entities/user';
import { tokensService } from '../entities/viewer';
import { ForwardMessagesModal } from '../features/message';
import { useEffectOnce, useRecognizeSpeech, useRouter, useRustServer, useStorage, useWebSocket } from '../shared/hooks';
import { Modal } from '../shared/ui';

function Provider({ children }: { children: any }) {
    useRecognizeSpeech();
    const queryClient = useQueryClient();
    const { params, pathname, navigate } = useRouter();
    const ls = useStorage();

    const { inCall } = useMeet();

    const chatSubscription = chatStore.use.chatSubscription();
    const invitationToConference = meetStore.use.invitationToConference();
    const forwardMessages = messageStore.use.forwardMessages();
    const openForwardMessageModal = messageStore.use.openForwardMessageModal();
    const forwardMessagesModal = Modal.use();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const { socket, create, close } = usePhotoVideoSwiper();

    useEffect(() => {
        socket.listen<any>('photo_video_swiper', 'forwardMessage', (message) => {
            forwardMessages.set({ fromChatName: 'fef', toChatId: message.chat_id, messages: [message], redirect: false });
            openForwardMessageModal.set(true);
        });
    }, []);

    useEffect(() => {
        if (invitationToConference.value?.id && !ls.get('by_meet') && !ls.get('join_meet_data')) {
            if (appService.tauriIsRunning) {
                inCall(invitationToConference.value);
                invitationToConference.clear();
            }
        }
    }, [invitationToConference.value?.id]);

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
            meetGateway(data, queryClient, { invitationToConference });
        });
    });

    useEffect(() => {
        if (openForwardMessageModal.value) {
            forwardMessagesModal.open();
        } else {
            forwardMessagesModal.close();
        }
    }, [openForwardMessageModal.value]);

    return (
        <>
            <ForwardMessagesModal {...forwardMessagesModal} />
            {children}
        </>
    );
}

export default Provider;
