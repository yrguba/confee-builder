import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { SidebarForCompanyPage } from 'widgets/sidebars';

import styles from './styles.module.scss';

function CompanyPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.sidebar}>
                <SidebarForCompanyPage />
            </div>
            <div className={styles.mainColumn}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default CompanyPage;
