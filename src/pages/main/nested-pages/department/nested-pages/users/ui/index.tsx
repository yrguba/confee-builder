import React from 'react';

import { useUserStore } from 'entities/user';
import { Box } from 'shared/ui';
import { BreadcrumbDepartmentPage } from 'widgets/department-page';
import { UsersListFromUsersPage, SelectedUsersFromUsersPage } from 'widgets/users-page';

import styles from './styles.module.scss';

function UsersPage() {
    const selectedUsers = useUserStore.use.selectedUsers();

    return (
        <Box.Animated visible className={styles.page}>
            <div className={styles.header}>
                <BreadcrumbDepartmentPage />
            </div>
            <div className={styles.maiRow}>
                <Box.Animated animationVariant="autoHeight" visible={!!selectedUsers.length} className={styles.selectedUsers}>
                    <SelectedUsersFromUsersPage />
                </Box.Animated>
                <Box.Animated
                    presenceProps={{ initial: false }}
                    initial={{ height: '96%' }}
                    animate={{ height: selectedUsers.length ? '76%' : '96%' }}
                    transition={{ duration: 1 }}
                    visible
                    className={styles.info}
                >
                    <UsersListFromUsersPage />
                </Box.Animated>
            </div>
        </Box.Animated>
    );
}

export default UsersPage;
