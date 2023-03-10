import React from 'react';

import { SwitchingNestedPagesOfMainPage } from 'features/tabs';
import { ViewerCard } from 'features/viewer';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function HeaderForMainPage() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons variants="logo" />
            </div>
            <div className={styles.tabs}>
                <SwitchingNestedPagesOfMainPage />
            </div>
            <div className={styles.viewer}>
                <ViewerCard />
            </div>
        </div>
    );
}

export default HeaderForMainPage;
