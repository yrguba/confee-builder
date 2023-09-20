import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { chatGateway, useChatStore } from '../../../../entities/chat';
import { messageGateway } from '../../../../entities/message';
import { userGateway } from '../../../../entities/user';
import { useRouter, useWebSocket } from '../../../../shared/hooks';
import useRecognizeSpeech from '../../../../shared/hooks/useRecognizeSpeech';
import { Notification } from '../../../../shared/ui';
import Navbar from '../widgets/navbar';

function MainLayout() {
    const navigate = useNavigate();
    const { params, pathname } = useRouter();
    const chatSubscription = useChatStore.use.chatSubscription();

    useRecognizeSpeech();
    chatGateway();
    userGateway();
    messageGateway();

    useEffect(() => {
        if (!params.chat_id) chatSubscription.set(null);
    }, [params.chat_id]);

    useEffect(() => {
        if (pathname === '/') {
            navigate('/chats');
        }
    }, [navigate]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
