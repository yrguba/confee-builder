import React from 'react';

import { CompanyPageNavigation } from 'features/navbars';

import styles from './styles.module.scss';

function BreadcrumbCompanyPage() {
    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <CompanyPageNavigation />
            </div>
        </div>
    );
}

export default BreadcrumbCompanyPage;
