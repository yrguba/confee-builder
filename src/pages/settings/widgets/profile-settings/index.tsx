import React from 'react';

import { ViewerDossier } from 'features/viewer';

import styles from './styles.module.scss';

function ProfileSettingsWidget() {
    return (
        <div className={styles.wrapper}>
            <ViewerDossier />
        </div>
    );
}

export default ProfileSettingsWidget;
