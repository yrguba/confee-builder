import React from 'react';
import { Outlet } from 'react-router-dom';

import { ChatApi } from 'entities/chat';
import { Box } from 'shared/ui';
import { LeftSidebarForChatsPage, HeaderForChatsPage, MessagesListForChatsPage, MessageInputForChatsPage } from 'widgets/chats-page';

import styles from './styles.module.scss';
import { MessageApi } from '../../../../../entities/message';

function ChatsPage() {
    ChatApi.subscriptions();
    MessageApi.subscriptions();

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
                    <div className={styles.messageInput}>
                        <MessageInputForChatsPage />
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
