import React from 'react';

import { PrivacySettings as PrivacySettingsFeature } from 'features/app';

import styles from './styles.module.scss';

function PrivacySettings() {
    return (
        <div className={styles.wrapper}>
            <PrivacySettingsFeature />
        </div>
    );
}

export default PrivacySettings;
