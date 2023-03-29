import React from 'react';

import { ViewerDossier } from 'features/viewer';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function MainFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <ViewerDossier />
        </div>
    );
}

export default MainFromSettingsPage;
