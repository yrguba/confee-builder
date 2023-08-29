import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

function WarningPage() {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
}

export default WarningPage;
