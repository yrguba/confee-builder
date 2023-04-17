import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import { chatGateway, chatObserver } from 'entities/chat';
import { useMessageStore, messageGateway, messageObserver } from 'entities/message';
import { useSize } from 'shared/hooks';
import { Box } from 'shared/ui';
import { LeftSidebarForChatsPage, HeaderForChatsPage, MessagesListForChatsPage, MessageInputForChatsPage } from 'widgets/chats-page';

import styles from './styles.module.scss';

function ChatsPage() {
    chatObserver();
    messageObserver();

    chatGateway();
    messageGateway();

    const params = useParams();
    const { width } = useSize();

    const isOpenEmojiPicker = useMessageStore.use.isOpenEmojiPicker();
    const isOpenInputMenu = useMessageStore.use.isOpenInputMenu();

    const animation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <Box.Animated visible className={styles.page}>
            <AnimatePresence mode="wait" initial={false}>
                {(!params?.chat_id || width > 680) && (
                    <motion.div key={1} className={styles.leftSidebar} {...animation}>
                        <LeftSidebarForChatsPage />
                    </motion.div>
                )}
                {(!!params?.chat_id || width > 680) && (
                    <motion.div key={2} className={styles.mainColumn} {...animation}>
                        <div className={styles.header}>
                            <HeaderForChatsPage />
                        </div>
                        <div className={styles.outlet}>
                            <div className={styles.messageList}>
                                <MessagesListForChatsPage />
                            </div>
                            <Box.Animated
                                initial={{ height: 100 }}
                                animate={{ height: isOpenEmojiPicker ? 500 : isOpenInputMenu ? 240 : 100, transition: { duration: 0 } }}
                                exit={{ transition: { duration: 1 } }}
                                visible
                                className={styles.messageInput}
                            >
                                <MessageInputForChatsPage />
                            </Box.Animated>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.rightSidebar}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default ChatsPage;
