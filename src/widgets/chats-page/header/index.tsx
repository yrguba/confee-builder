import React from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatService } from 'entities/chat';
import { VideoCallBtn, AudioCallBtn } from 'features/button';
import { ChatCard } from 'features/chat';
import { SearchMessages } from 'features/message';
import { Box, Button, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { useSize } from '../../../shared/hooks';

function HeaderForChatsPage() {
    const { pathname } = useLocation();
    const navigation = useNavigate();
    const params = useParams();
    const { width } = useSize();
    const openChatId = ChatService.getOpenChatId();

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <Box.Animated visible={!!openChatId} key={pathname.split('/')[4]} className={styles.card}>
                    <Box.Animated
                        onClick={() => navigation(pathname.split('/').splice(0, 3).join('/'))}
                        visible={!!openChatId && width < 680}
                        className={styles.back}
                    >
                        <Icons variants="backArrow" />
                    </Box.Animated>
                    <ChatCard />
                </Box.Animated>
                <Box.Animated visible={!!openChatId && !ChatService.checkIsOpenChatInfo()} animationVariant="autoWidth" className={styles.rightColumn}>
                    <SearchMessages />
                    <VideoCallBtn />
                    <AudioCallBtn />
                </Box.Animated>
            </div>
        </div>
    );
}

export default HeaderForChatsPage;
