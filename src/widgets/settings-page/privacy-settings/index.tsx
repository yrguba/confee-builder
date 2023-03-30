import React from 'react';

import { PrivacySettings } from 'features/viewer';

import styles from './styles.module.scss';

function PrivacyFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.PrivacySettings}>
                <PrivacySettings />
            </div>
        </div>
    );
}

export default PrivacyFromSettingsPage;
