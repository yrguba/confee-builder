import React from 'react';
import { useParams } from 'react-router';

import { DepartmentPageNavigation } from 'features/navbars';

import styles from './styles.module.scss';

function BreadcrumbDepartmentPage() {
    const params = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav} style={{ paddingLeft: params.user_id && 0 }}>
                <DepartmentPageNavigation />
            </div>
        </div>
    );
}

export default BreadcrumbDepartmentPage;
