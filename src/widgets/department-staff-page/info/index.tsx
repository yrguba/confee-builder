import React from 'react';
import { useParams } from 'react-router';

import { SearchUsers } from 'features/search';
import { UsersList } from 'features/user';

import styles from './styles.module.scss';

function InfoDepartmentStaffPage() {
    const params = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.name}>{params.division_name || params.department_name}</div>
                <div>
                    <SearchUsers placeholder="Поиск по сотрудникам отдела" />
                </div>
            </div>
            <div className={styles.list}>
                <UsersList />
            </div>
        </div>
    );
}

export default InfoDepartmentStaffPage;
