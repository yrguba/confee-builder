import React from 'react';
import { useLocation } from 'react-router-dom';

import { ChatService } from 'entities/chat';
import { VideoCallBtn, AudioCallBtn } from 'features/button';
import { ChatCard } from 'features/chat';
import { SearchMessages } from 'features/message';

import styles from './styles.module.scss';
import { Box } from '../../../shared/ui';

function HeaderForChatsPage() {
    const { pathname } = useLocation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <ChatCard />
            </div>
            <Box.Animated visible={!ChatService.checkIsOpenChatInfo()} animationVariant="autoWidth" className={styles.rightColumn}>
                <SearchMessages />
                <VideoCallBtn />
                <AudioCallBtn />
            </Box.Animated>
        </div>
    );
}

export default HeaderForChatsPage;
