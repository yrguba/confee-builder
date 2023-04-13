import React from 'react';
import { Outlet } from 'react-router-dom';

import { chatGateway } from 'entities/chat';
import { useMessageStore } from 'entities/message';
import { Box } from 'shared/ui';
import { LeftSidebarForChatsPage, HeaderForChatsPage, MessagesListForChatsPage, MessageInputForChatsPage } from 'widgets/chats-page';

import styles from './styles.module.scss';
import { messageGateway } from '../../../../../entities/message';

function ChatsPage() {
    chatGateway();
    messageGateway();

    const isOpenEmojiPicker = useMessageStore.use.isOpenEmojiPicker();

    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.leftSidebar}>
                <LeftSidebarForChatsPage />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <HeaderForChatsPage />
                </div>
                <div className={styles.outlet}>
                    <div className={styles.messageList}>
                        <MessagesListForChatsPage />
                    </div>
                    <Box.Animated
                        initial={{ height: 100 }}
                        animate={{ height: isOpenEmojiPicker ? 500 : 100, transition: { duration: 0 } }}
                        exit={{ transition: { duration: 1 } }}
                        visible
                        className={styles.messageInput}
                    >
                        <MessageInputForChatsPage />
                    </Box.Animated>
                </div>
            </div>

            <div className={styles.rightSidebar}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default ChatsPage;
