import React from 'react';

import { SearchUsers } from 'features/search';
import { UsersList } from 'features/users';

import styles from './styles.module.scss';

function SidebarForCompanyPage() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.search}>
                <SearchUsers />
            </div>
            <div className={styles.list}>
                <UsersList />
            </div>
        </div>
    );
}

export default SidebarForCompanyPage;
