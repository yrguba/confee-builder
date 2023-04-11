import React from 'react';

import { SwitchThemes } from 'features/application';

import styles from './styles.module.scss';

function ApplicationFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Настройки приложения</div>
            <div className={styles.switchThemes}>
                <SwitchThemes />
            </div>
        </div>
    );
}

export default ApplicationFromSettingsPage;