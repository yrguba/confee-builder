import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useStyles, useToggle } from 'shared/hooks';
import { Box, Button } from 'shared/ui';
import { LeftSidebarChatsPage, RightSidebarChatsPage, HeaderChatsPage, MessagesListChatsPage, MessageInput } from 'widgets/chats-page';

import styles from './styles.module.scss';

function ChatsPage() {
    const { pathname } = useLocation();

    const [visibleRightSidebar, toggle] = useToggle(false);

    useEffect(() => {
        const lastPath = pathname.split('/').pop() || '';
        toggle(['info'].includes(lastPath));
    }, [pathname]);

    const mainColumnClasses = useStyles(styles, 'mainColumn', {
        visibleRightSidebar,
    });

    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.leftSidebar}>
                <LeftSidebarChatsPage />
            </div>
            <div className={mainColumnClasses}>
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
            <Box.Animated animationVariant="autoWidth" visible={visibleRightSidebar} className={styles.rightSidebar}>
                <RightSidebarChatsPage />
            </Box.Animated>
        </Box.Animated>
    );
}

export default ChatsPage;
