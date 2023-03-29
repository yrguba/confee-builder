import React from 'react';

import { DepartmentPageNavigation } from 'features/navbars';

import styles from './styles.module.scss';

function BreadcrumbDepartmentPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <DepartmentPageNavigation />
            </div>
        </div>
    );
}

export default BreadcrumbDepartmentPage;
