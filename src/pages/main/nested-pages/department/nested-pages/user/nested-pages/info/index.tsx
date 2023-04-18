import React from 'react';
import { Outlet } from 'react-router-dom';

import { ProfileFromInfoPage } from 'widgets/user-info-page';

import styles from './styles.module.scss';

function InfoPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                <ProfileFromInfoPage />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default InfoPage;
