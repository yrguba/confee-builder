import React from 'react';
import { useLocation } from 'react-router-dom';

import { ChatService } from 'entities/chat';
import { VideoCallBtn, AudioCallBtn } from 'features/button';
import { ChatCard } from 'features/chat';
import { SearchMessages } from 'features/message';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function HeaderForChatsPage() {
    const { pathname } = useLocation();

    return (
        <div className={styles.wrapper}>
            <Box.Animated visible={ChatService.checkIsOpenChat()} key={pathname.split('/')[4]} className={styles.card}>
                <ChatCard />
            </Box.Animated>
            <Box.Animated
                visible={ChatService.checkIsOpenChat() && !ChatService.checkIsOpenChatInfo()}
                animationVariant="autoWidth"
                className={styles.rightColumn}
            >
                <SearchMessages />
                <VideoCallBtn />
                <AudioCallBtn />
            </Box.Animated>
        </div>
    );
}

export default HeaderForChatsPage;
