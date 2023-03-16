import React from 'react';

import { Box } from 'shared/ui';
import { BreadcrumbCompanyPage } from 'widgets/company-page';
import { InfoDepartmentStaffPage } from 'widgets/department-staff-page';

import styles from './styles.module.scss';

function DepartmentPage() {
    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.header}>
                <BreadcrumbCompanyPage />
            </div>
            <div className={styles.maiRow}>
                <InfoDepartmentStaffPage />
            </div>
        </Box.Animated>
    );
}

export default DepartmentPage;
