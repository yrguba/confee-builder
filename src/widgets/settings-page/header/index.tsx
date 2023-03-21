import React from 'react';

import { ViewerCard } from 'features/viewer';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function HeaderSettingsPage() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons.Logo variants="confee" />
            </div>
            <div className={styles.viewer}>
                <ViewerCard />
            </div>
        </div>
    );
}

export default HeaderSettingsPage;
