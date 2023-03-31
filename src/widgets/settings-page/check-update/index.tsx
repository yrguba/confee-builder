import React from 'react';

import { CheckUpdate } from 'features/application';

import styles from './styles.module.scss';

function CheckUpdateFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.checkUpdate}>
                <CheckUpdate />
            </div>
        </div>
    );
}

export default CheckUpdateFromSettingsPage;
