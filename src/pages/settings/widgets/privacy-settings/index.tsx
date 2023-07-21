import React from 'react';

import { PrivacySettings } from 'features/app';

import styles from './styles.module.scss';

function PrivacySettingsWidget() {
    return (
        <div className={styles.wrapper}>
            <PrivacySettings />
        </div>
    );
}

export default PrivacySettingsWidget;
