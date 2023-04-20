import React from 'react';

import { ViewerCard } from 'features/viewer';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { HeaderMainPage } from '../../main-page';

function HeaderFromSettingsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Icons.Logo variants="confee" />
            </div>
            <div className={styles.viewer}>
                <ViewerCard />
            </div>
        </div>
    );
}

export default HeaderMainPage;
