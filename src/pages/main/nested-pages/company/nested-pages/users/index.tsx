import React from 'react';
import { useParams } from 'react-router';

import { HeaderForCompanyPage } from 'widgets/headers';

import styles from './styles.module.scss';

function UsersPage() {
    const params = useParams();
    console.log(params);
    const lastKey: any = Object.keys(params).pop();

    const breadcrumbItems = ['/company', ...Object.values(params)];

    return (
        <div className={styles.page}>
            <HeaderForCompanyPage />
            <div> {params[lastKey]}</div>
        </div>
    );
}

export default UsersPage;
