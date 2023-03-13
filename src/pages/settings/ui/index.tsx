import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'shared/ui';
import { HeaderForSettingsPage } from 'widgets/headers';
import { SidebarForSettingsPage } from 'widgets/sidebars';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function SettingsPage() {
    return (
        <Wrapper>
            <div className={styles.page}>
                <div className={styles.header}>
                    <HeaderForSettingsPage />
                </div>
                <Box.Animated presenceProps={{ mode: 'wait' }} visible className={styles.mainRow}>
                    <div className={styles.sidebar}>
                        <SidebarForSettingsPage />
                    </div>
                    <div className={styles.outlet}>
                        <Outlet />
                    </div>
                </Box.Animated>
            </div>
        </Wrapper>
    );
}

export default SettingsPage;
