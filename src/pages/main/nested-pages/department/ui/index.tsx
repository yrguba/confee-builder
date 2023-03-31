import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { SidebarFromDepartmentPage } from 'widgets/department-page';

import styles from './styles.module.scss';

function DepartmentPage() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.sidebar}>
                <SidebarFromDepartmentPage />
            </div>
            <div className={styles.mainColumn}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default DepartmentPage;
