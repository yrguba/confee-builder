import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { Header, Sidebar } from '../widgets';

function TasksPage() {
    return (
        <Box.Animated visible className={styles.page}>
            Раздел находится в разработке
            {/* <div className={styles.sidebar}> */}
            {/*    <SidebarTasksPage /> */}
            {/* </div> */}
            {/* <div className={styles.mainColumn}> */}
            {/*    <div className={styles.header}> */}
            {/*        <HeaderTasksPage /> */}
            {/*    </div> */}
            {/*    <div className={styles.outlet}> */}
            {/*        <Outlet /> */}
            {/*    </div> */}
            {/* </div> */}
        </Box.Animated>
    );
}

export default TasksPage;
