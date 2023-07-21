import React from 'react';

import { AppService } from 'entities/app';
import { Box } from 'shared/ui';
import { Header } from 'widgets';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';
import { PrivacySettingsWidget, AppSettingsWidget, CheckUpdateWidget, ProfileSettingsWidget } from '../widgets';

function SettingsPage() {
    const items = [
        { id: 0, element: <ProfileSettingsWidget /> },
        { id: 1, element: <PrivacySettingsWidget /> },
        { id: 2, element: <AppSettingsWidget /> },
        { id: 3, element: AppService.tauriIsRunning ? <CheckUpdateWidget /> : null },
    ];

    return (
        <Wrapper className={styles.wrapper}>
            <Header />
            <Box.Animated visible className={styles.body}>
                {items.map((i) => (
                    <div key={i.id} className={styles.row} style={{ display: !AppService.tauriIsRunning && i.id === 3 ? 'none' : 'flex' }}>
                        {i.element}
                    </div>
                ))}
            </Box.Animated>
        </Wrapper>
    );
}

export default SettingsPage;
