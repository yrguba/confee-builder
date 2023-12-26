import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { appService } from '../../../../entities/app';
import { chatApi, chatGateway, useChatStore } from '../../../../entities/chat';
import { meetGateway, useMeetStore } from '../../../../entities/meet';
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
    const joinRequest = useMeetStore.use.joinRequest();

    const ls = useStorage();

    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();
    useRecognizeSpeech();
    chatGateway();
    userGateway();
    messageGateway();
    meetGateway();

    const webView = useWebView({
        id: 'join_meet',
        title: `приглашение в конференцию`,
        onClose: () => {
            ls.remove('req-to-join-room');
        },
    });

    useEffect(() => {
        if (joinRequest.value.id) {
            if (appService.tauriIsRunning) {
                ls.set('req-to-join-room', joinRequest.value);
                webView?.open(`/meet/join`);
                setTimeout(() => joinRequest.clear(), 500);
            }
        }
    }, [joinRequest.value]);

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
