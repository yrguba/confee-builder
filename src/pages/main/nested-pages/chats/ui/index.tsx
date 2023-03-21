import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { SidebarChatsPage, HeaderChatsPage } from 'widgets/chats-page';

import styles from './styles.module.scss';

function ChatsPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.sidebar}>
                <SidebarChatsPage />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <HeaderChatsPage />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </Box.Animated>
    );
}

export default ChatsPage;
