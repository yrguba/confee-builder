import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { HeaderForUserPage } from 'widgets/headers';

import styles from './styles.module.scss';

function UserPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.header}>
                <HeaderForUserPage />
            </div>
            <div className={styles.mainRow}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default UserPage;
