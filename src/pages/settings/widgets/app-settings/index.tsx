import React from 'react';

import { AppSettings } from 'features/app';

import styles from './styles.module.scss';

function AppSettingsWidget() {
    return (
        <div className={styles.wrapper}>
            <AppSettings />
        </div>
    );
}

export default AppSettingsWidget;
