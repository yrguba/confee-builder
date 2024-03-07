import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { appService } from 'entities/app';
import { chatApi, chatGateway, chatStore } from 'entities/chat';
import { meetGateway, useMeet, meetStore } from 'entities/meet';
import { messageGateway } from 'entities/message';
import { userGateway } from 'entities/user';
import { useRouter, useStorage, useRecognizeSpeech } from 'shared/hooks';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import Navbar from '../widgets/navbar';

function MainLayout() {
    const navigate = useNavigate();
    const { params, pathname } = useRouter();
    const chatSubscription = chatStore.use.chatSubscription();

    const invitationToConference = meetStore.use.invitationToConference();
    // console.log(invitationToConference.value.)
    const currentlyPlaying = Audio.store.use.currentlyPlaying();

    const ls = useStorage();

    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();
    useRecognizeSpeech();
    chatGateway();
    userGateway();
    messageGateway();
    meetGateway();

    const { inCall } = useMeet();

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

    return (
        <>
            <div
                className={styles.wrapper}
                style={{
                    height: !currentlyPlaying.value.src ? '100vh' : params.chat_id ? '100vh' : 'calc(100vh - 60px)',
                }}
            >
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
