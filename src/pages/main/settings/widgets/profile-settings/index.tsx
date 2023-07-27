import React from 'react';

import { ViewerDossier } from 'features/viewer';

import styles from './styles.module.scss';

function ProfileSettings() {
    return (
        <div className={styles.wrapper}>
            <ViewerDossier />
        </div>
    );
}

export default ProfileSettings;
