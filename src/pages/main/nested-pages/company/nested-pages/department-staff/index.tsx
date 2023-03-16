import React from 'react';

import { BreadcrumbCompanyPage } from 'widgets/company-page';
import { InfoDepartmentStaffPage } from 'widgets/department-staff-page';

import styles from './styles.module.scss';

function DepartmentPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <BreadcrumbCompanyPage />
            </div>
            <div className={styles.maiRow}>
                <InfoDepartmentStaffPage />
            </div>
        </div>
    );
}

export default DepartmentPage;
