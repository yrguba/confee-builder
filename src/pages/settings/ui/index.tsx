import React from 'react';
import { Outlet } from 'react-router-dom';

import { SwitchThemes } from 'features/switch';
import { Box } from 'shared/ui';
import { HeaderSettingsPage } from 'widgets/settings-page';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function SettingsPage() {
    return (
        <Wrapper>
            <div className={styles.page}>
                <div className={styles.header}>
                    <HeaderSettingsPage />
                </div>
                <Box.Animated presenceProps={{ mode: 'wait' }} visible className={styles.mainRow}>
                    <SwitchThemes />
                    SettingsPage
                </Box.Animated>
            </div>
        </Wrapper>
    );
}

export default SettingsPage;
