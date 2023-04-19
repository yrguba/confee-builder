import React from 'react';

import { AppSettings, SwitchThemes } from 'features/app';

import styles from './styles.module.scss';

function AppFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <AppSettings />
            </div>
        </div>
    );
}

export default AppFromSettingsPage;
