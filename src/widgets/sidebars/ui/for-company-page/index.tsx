import React from 'react';

import { SearchUsers } from 'features/search';
import { DepartmentsList } from 'features/user';

import styles from './styles.module.scss';

function SidebarForCompanyPage() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.search}>
                <SearchUsers />
            </div>
            <div className={styles.list}>
                <DepartmentsList />
            </div>
        </div>
    );
}

export default SidebarForCompanyPage;
