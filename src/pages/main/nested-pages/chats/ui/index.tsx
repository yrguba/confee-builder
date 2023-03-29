import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { LeftSidebarChatsPage, HeaderChatsPage, MessagesListChatsPage, MessageInput } from 'widgets/chats-page';

import styles from './styles.module.scss';

function ChatsPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.leftSidebar}>
                <LeftSidebarChatsPage />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <HeaderChatsPage />
                </div>
                <div className={styles.outlet}>
                    <div className={styles.messageList}>
                        <MessagesListChatsPage />
                    </div>
                    <div className={styles.messageInput}>
                        <MessageInput />
                    </div>
                </div>
            </div>

            <div className={styles.rightSidebar}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default ChatsPage;
