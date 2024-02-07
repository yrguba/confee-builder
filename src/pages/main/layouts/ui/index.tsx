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
import { Audio, Modal, Notification } from '../../../../shared/ui';
import useAudioStore from '../../../../shared/ui/media-content/audio/store';
import Navbar from '../widgets/navbar';

function MainLayout() {
    const navigate = useNavigate();
    const { params, pathname } = useRouter();
    const chatSubscription = useChatStore.use.chatSubscription();

    const invitationToConference = useMeetStore.use.invitationToConference();

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const ls = useStorage();

    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();
    useRecognizeSpeech();
    chatGateway();
    userGateway();
    messageGateway();
    meetGateway();

    const { inCall } = useMeet();

    useEffect(() => {
        if (invitationToConference.value.id && !ls.get('by_meet') && !ls.get('join_meet_data')) {
            if (appService.tauriIsRunning) {
                inCall(invitationToConference.value);
                invitationToConference.clear();
            }
        }
    }, [invitationToConference.value.id]);

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
                {currentlyPlaying.value.src && !params.chat_id && (
                    <div className={styles.player}>
                        <Audio.Player sliderPosition="top" />
                    </div>
                )}
            </div>
        </>
    );
}

export default MainLayout;
