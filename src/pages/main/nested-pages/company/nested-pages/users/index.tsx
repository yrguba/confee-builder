import React from 'react';
import { useParams } from 'react-router';

import { BreadcrumbCompanyPage } from 'widgets/company-page';

import styles from './styles.module.scss';

function UsersPage() {
    const params = useParams();
    const lastKey: any = Object.keys(params).pop();

    return (
        <div className={styles.page}>
            <BreadcrumbCompanyPage />
            <div> {params[lastKey]}</div>
        </div>
    );
}

export default UsersPage;
