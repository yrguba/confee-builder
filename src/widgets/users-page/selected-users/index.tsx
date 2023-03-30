import React from 'react';

import { SelectedUsers } from 'features/user';

import styles from './styles.module.scss';

function SelectedUsersFromUsersPage() {
    return (
        <div className={styles.wrapper}>
            <SelectedUsers />
        </div>
    );
}

export default SelectedUsersFromUsersPage;
