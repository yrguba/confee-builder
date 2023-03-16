import React from 'react';

import { useUserStore } from 'entities/user';
import { Box } from 'shared/ui';
import { BreadcrumbCompanyPage } from 'widgets/company-page';
import { InfoDepartmentStaffPage, SelectedUsersDepartmentStaffPage } from 'widgets/department-staff-page';

import styles from './styles.module.scss';

function DepartmentPage() {
    const selectedUsers = useUserStore.use.selectedUsers();

    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.header}>
                <BreadcrumbCompanyPage />
            </div>
            <div className={styles.maiRow}>
                <Box.Animated animationVariant="auto-height" visible={!!selectedUsers.length} className={styles.selectedUsers}>
                    <SelectedUsersDepartmentStaffPage />
                </Box.Animated>
                <Box.Animated
                    presenceProps={{ initial: false }}
                    initial={{ height: '96%' }}
                    animate={{ height: selectedUsers.length ? '80%' : '96%' }}
                    transition={{ duration: 1 }}
                    visible
                    className={styles.info}
                >
                    <InfoDepartmentStaffPage />
                </Box.Animated>
            </div>
        </Box.Animated>
    );
}

export default DepartmentPage;
