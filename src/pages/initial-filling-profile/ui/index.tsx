import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

function InitialFillingProfilePage() {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
}

export default InitialFillingProfilePage;
