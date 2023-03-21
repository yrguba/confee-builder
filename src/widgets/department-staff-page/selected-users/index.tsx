import React from 'react';
import { useParams } from 'react-router';

import { SelectedUsers } from 'features/user';

import styles from './styles.module.scss';

function SelectedUsersDepartmentStaffPage() {
    return (
        <div className={styles.wrapper}>
            <SelectedUsers />
        </div>
    );
}

export default SelectedUsersDepartmentStaffPage;
