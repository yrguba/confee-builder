import React from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderForCompanyPage } from 'widgets/headers';

import styles from './styles.module.scss';

function CompanyPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <HeaderForCompanyPage />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default CompanyPage;
