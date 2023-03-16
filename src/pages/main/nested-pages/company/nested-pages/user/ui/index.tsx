import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { BreadcrumbCompanyPage } from 'widgets/company-page';
import { HeaderUserPage } from 'widgets/user-page';

import styles from './styles.module.scss';

function UserPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.header}>
                <HeaderUserPage />
            </div>
            <div className={styles.breadcrumb}>
                <BreadcrumbCompanyPage />
            </div>
            <div className={styles.mainRow}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default UserPage;
