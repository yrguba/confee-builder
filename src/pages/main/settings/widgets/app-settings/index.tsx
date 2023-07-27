import React from 'react';

import { AppSettings as AppSettingsFeature } from 'features/app';

import styles from './styles.module.scss';

function AppSettings() {
    return (
        <div className={styles.wrapper}>
            <AppSettingsFeature />
        </div>
    );
}

export default AppSettings;
