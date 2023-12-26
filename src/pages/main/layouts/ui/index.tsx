import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { appService } from '../../../../entities/app';
import { chatApi, chatGateway, useChatStore } from '../../../../entities/chat';
import { meetGateway, useMeet, useMeetStore } from '../../../../entities/meet';
import { messageGateway } from '../../../../entities/message';
import { userGateway } from '../../../../entities/user';
import { JoinMeet } from '../../../../features/meet';
import { useRouter, useStorage, useWebSocket, useWebView } from '../../../../shared/hooks';
import useRecognizeSpeech from '../../../../shared/hooks/useRecognizeSpeech';
import { Modal, Notification } from '../../../../shared/ui';
import Navbar from '../widgets/navbar';

function MainLayout() {
    const navigate = useNavigate();
    const { params, pathname } = useRouter();
    const chatSubscription = useChatStore.use.chatSubscription();

    const invitationsToConference = useMeetStore.use.invitationsToConference();

    const ls = useStorage();

    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();
    useRecognizeSpeech();
    chatGateway();
    userGateway();
    messageGateway();
    meetGateway();

    const { inCall } = useMeet();

    useEffect(() => {
        if (invitationsToConference.value.length && !ls.get('by_meet')) {
            if (appService.tauriIsRunning) {
                inCall(invitationsToConference.value[0]);
            }
        }
    }, [invitationsToConference.value.length]);

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

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.navbar}>
                    <Navbar />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default MainLayout;
