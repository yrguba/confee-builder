import React from 'react';

import { MainPageNavigation } from 'features/navbars';
import { ViewerCard } from 'features/viewer';
import { Icons, Box } from 'shared/ui';

import styles from './styles.module.scss';

function HeaderForMainPage() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons variants="logo" />
            </div>
            <Box.Animated presenceProps={{ mode: 'wait' }} visible className={styles.nav}>
                <MainPageNavigation />
            </Box.Animated>
            <div className={styles.viewer}>
                <ViewerCard />
            </div>
        </div>
    );
}

export default HeaderForMainPage;
