import React from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderTasksPage, SidebarTasksPage } from 'widgets/tasks-page';

import styles from './styles.module.scss';
import { Box } from '../../../../../shared/ui';

function TasksPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.sidebar}>
                <SidebarTasksPage />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <HeaderTasksPage />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </Box.Animated>
    );
}

export default TasksPage;
