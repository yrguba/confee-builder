import React from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderForTasksPage } from 'widgets/headers';
import { SidebarForTasksPage } from 'widgets/sidebars';

import styles from './styles.module.scss';
import { Box } from '../../../../../shared/ui';

function TasksPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.sidebar}>
                <SidebarForTasksPage />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <HeaderForTasksPage />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </Box.Animated>
    );
}

export default TasksPage;
