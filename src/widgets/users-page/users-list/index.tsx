import React from 'react';

import { UsersList } from 'features/user';

import styles from './styles.module.scss';

function UsersListFromUsersPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                <UsersList />
            </div>
        </div>
    );
}

export default UsersListFromUsersPage;
