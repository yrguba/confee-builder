import React from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderForSettingsPage } from 'widgets/headers';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function SettingsPage() {
    return (
        <Wrapper>
            <div className={styles.page}>
                <div className={styles.header}>
                    <HeaderForSettingsPage />
                </div>
                <div className={styles.mainRow}>
                    <div className={styles.sidebar}>da</div>
                    <div className={styles.outlet}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default SettingsPage;
