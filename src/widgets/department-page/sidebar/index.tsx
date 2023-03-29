import React from 'react';

import { SearchDepartment } from 'features/department';
import { DepartmentsList } from 'features/user';

import styles from './styles.module.scss';

function SidebarFromDepartmentPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <SearchDepartment />
            </div>
            <div className={styles.list}>
                <DepartmentsList />
            </div>
        </div>
    );
}

export default SidebarFromDepartmentPage;
