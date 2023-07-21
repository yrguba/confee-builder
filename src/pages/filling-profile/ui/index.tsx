import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';
import { appObserver } from '../../../entities/app';

function FillingProfilePage() {
    appObserver();

    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
}

export default FillingProfilePage;
