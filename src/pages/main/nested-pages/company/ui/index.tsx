import React from 'react';

import { HeaderForCompanyPage } from 'widgets/headers';

import styles from './styles.module.scss';

function CompanyPage() {
    return (
        <div className={styles.page}>
            <HeaderForCompanyPage />
            CompanyNestedPage
        </div>
    );
}

export default CompanyPage;
