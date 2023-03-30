import React from 'react';
import { useParams } from 'react-router';

import { SearchUsers, UsersList } from 'features/user';

import styles from './styles.module.scss';

function InfoDepartmentStaffPage() {
    const params = useParams();

    const getPlaceholderAnaTitle = () => {
        if (params.division_name) return { pl: 'Поиск по сотрудникам отдела', tl: params.division_name };
        if (params.department_name) return { pl: 'Поиск по сотрудникам департамента', tl: params.department_name };
        return { pl: 'Поиск по всем сотрудникам', tl: 'Все сотрудники' };
    };

    const { pl, tl } = getPlaceholderAnaTitle();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.name}>{tl}</div>
                <div>
                    <SearchUsers placeholder={pl} />
                </div>
            </div>
            <div className={styles.list}>
                <UsersList />
            </div>
        </div>
    );
}

export default InfoDepartmentStaffPage;
