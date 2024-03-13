import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { appService } from '../entities/app';
import { chatApi, chatGateway, chatStore } from '../entities/chat';
import { meetGateway, meetStore, useMeet } from '../entities/meet';
import { messageGateway } from '../entities/message';
import { userGateway } from '../entities/user';
import { useEffectOnce, useRecognizeSpeech, useRouter, useStorage, useWebSocket } from '../shared/hooks';

function Provider({ children }: { children: any }) {
    useRecognizeSpeech();
    const queryClient = useQueryClient();
    const { params, pathname, navigate } = useRouter();
    const ls = useStorage();
    const { inCall } = useMeet();

    const chatSubscription = chatStore.use.chatSubscription();
    const invitationToConference = meetStore.use.invitationToConference();

    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

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

    return children;
}

export default Provider;
