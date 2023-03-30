import React from 'react';

import { SearchDepartment, DepartmentsList } from 'features/department';

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
