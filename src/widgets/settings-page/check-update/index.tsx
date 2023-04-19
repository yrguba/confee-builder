import React from 'react';

import { CheckUpdate } from 'features/app';

import styles from './styles.module.scss';

function CheckUpdateFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <CheckUpdate />
            </div>
        </div>
    );
}

export default CheckUpdateFromSettingsPage;
