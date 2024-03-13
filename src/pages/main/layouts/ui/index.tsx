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
    const { params } = useRouter();

    const currentlyPlaying = Audio.store.use.currentlyPlaying();

    return (
        <>
            <div
                className={styles.wrapper}
                style={{
                    height: !currentlyPlaying.value?.src ? '100vh' : params.chat_id ? '100vh' : 'calc(100vh - 60px)',
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
