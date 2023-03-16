import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { HeaderMainPage } from 'widgets/main-page';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function MainPage() {
    return (
        <Wrapper>
            <div className={styles.page}>
                <div className={styles.header}>
                    <HeaderMainPage />
                </div>
                <Box.Animated presenceProps={{ mode: 'wait' }} visible className={styles.outlet}>
                    <Outlet />
                </Box.Animated>
            </div>
        </Wrapper>
    );
}

export default MainPage;
