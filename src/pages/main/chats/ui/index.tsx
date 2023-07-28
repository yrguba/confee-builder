import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router';
import { Outlet, useLocation } from 'react-router-dom';

import { chatGateway, chatObserver, ChatService, useChatStore } from 'entities/chat';
import { useMessageStore, messageGateway, messageObserver } from 'entities/message';
import { useMedia, useHeightMediaQuery, useWidthMediaQuery } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import Modals from '../modals';
import { LeftSidebar, Chat, RightSidebar } from '../widgets';

function ChatsPage() {
    chatObserver();
    messageObserver();

    chatGateway();
    messageGateway();

    const { breakpoint } = useMedia();

    const { to } = useHeightMediaQuery();

    const openChatId = ChatService.getOpenChatId();

    return (
        <>
            <Modals />
            <Box.Animated visible className={styles.wrapper}>
                <div className={styles.leftSidebar}>
                    <LeftSidebar />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
                <div className={styles.rightSidebar}>{/* <RightSidebar /> */}</div>
            </Box.Animated>
        </>
    );
}

export default ChatsPage;
