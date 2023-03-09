import React from 'react';

import { SwitchingNestedPagesOfMainPage } from 'features/tabs';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons variants="logo" />
            </div>
            <div className={styles.tabs}>
                <SwitchingNestedPagesOfMainPage />
            </div>
            <div className={styles.viewer}>wd</div>
        </div>
    );
}

export default Header;
