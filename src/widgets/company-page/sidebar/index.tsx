import React from 'react';

import { SearchDivision } from 'features/search';
import { DepartmentsList } from 'features/user';

import styles from './styles.module.scss';

function SidebarCompanyPage() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.search}>
                <SearchDivision />
            </div>
            <div className={styles.list}>
                <DepartmentsList />
            </div>
        </div>
    );
}

export default SidebarCompanyPage;
