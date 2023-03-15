import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { HeaderForChatsPage } from 'widgets/headers';
import { SidebarForChatsPage } from 'widgets/sidebars';

import styles from './styles.module.scss';

function ChatsPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.sidebar}>
                <SidebarForChatsPage />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <HeaderForChatsPage />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </Box.Animated>
    );
}

export default ChatsPage;
