import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Button } from 'shared/ui';
import { LeftSidebarChatsPage, RightSidebarChatsPage, HeaderChatsPage, MessagesListChatsPage, MessageInput } from 'widgets/chats-page';

import styles from './styles.module.scss';

function ChatsPage() {
    const [v, setV] = useState(false);
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
                        <Button onClick={() => setV(!v)}>open</Button>
                    </div>
                    <div className={styles.messageInput}>
                        <MessageInput />
                    </div>
                </div>
            </div>
            <Box.Animated animationVariant="autoWidth" visible={v} className={styles.rightSidebar}>
                <RightSidebarChatsPage />
            </Box.Animated>
        </Box.Animated>
    );
}

export default ChatsPage;
