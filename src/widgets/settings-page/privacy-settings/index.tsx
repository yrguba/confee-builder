import React from 'react';

import { PrivacySettings } from 'features/app';

import styles from './styles.module.scss';

function PrivacyFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <PrivacySettings />
            </div>
        </div>
    );
}

export default PrivacyFromSettingsPage;
