import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router';
import { Outlet, useLocation } from 'react-router-dom';

import { chatGateway, chatObserver, ChatService, useChatStore } from 'entities/chat';
import { useMessageStore, messageGateway, messageObserver } from 'entities/message';
import { ContactsModal } from 'features/user';
import { useMedia, useHeightMediaQuery, useWidthMediaQuery } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { LeftSidebar, Header, Footer, MessagesList, RightSidebar } from '../widgets';

function ChatsPage() {
    chatObserver();
    messageObserver();

    chatGateway();
    messageGateway();

    const { pathname } = useLocation();
    const params = useParams();
    const { breakpoint } = useMedia();

    const { to } = useHeightMediaQuery();

    const isOpenEmojiPicker = useMessageStore.use.isOpenEmojiPicker();
    const isOpenInputMenu = useMessageStore.use.isOpenInputMenu();
    const openChatInfo = useChatStore.use.openChatInfo();
    const openChatId = ChatService.getOpenChatId();

    const animation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const isVisibleLeftSidebar = () => {
        if (breakpoint !== 'sm') return true;
        return !params?.chat_id;
    };

    const isVisibleChatList = () => {
        if (breakpoint !== 'xxl' && openChatInfo) return false;
        if (breakpoint !== 'sm') return true;
        if (params?.chat_id && !openChatInfo) return true;
        return false;
    };

    const isVisibleRightSidebar = () => {
        if (breakpoint !== 'sm' && openChatInfo) return true;
        if (openChatInfo) return true;
        return false;
    };

    return (
        <>
            <ContactsModal />
            <Box.Animated visible className={styles.page}>
                <AnimatePresence mode="popLayout">
                    {isVisibleLeftSidebar() && (
                        <motion.div key={1} className={styles.leftSidebar} {...animation}>
                            <LeftSidebar />
                        </motion.div>
                    )}
                    {isVisibleChatList() && (
                        <motion.div key={2} className={styles.mainColumn} {...animation}>
                            {!!openChatId && (
                                <div className={styles.header}>
                                    <Header />
                                </div>
                            )}
                            <div className={styles.outlet}>
                                <div className={styles.messageList}>
                                    <Outlet />
                                </div>
                                <Box.Animated
                                    initial={{ height: 100 }}
                                    animate={{ height: 'auto', transition: { duration: 0 } }}
                                    exit={{ transition: { duration: 1 } }}
                                    visible
                                    className={styles.messageInput}
                                >
                                    <Footer />
                                </Box.Animated>
                            </div>
                        </motion.div>
                    )}
                    {isVisibleRightSidebar() && (
                        <div key={3} className={styles.rightSidebar} {...animation}>
                            <RightSidebar />
                        </div>
                    )}
                </AnimatePresence>
            </Box.Animated>
        </>
    );
}

export default ChatsPage;
