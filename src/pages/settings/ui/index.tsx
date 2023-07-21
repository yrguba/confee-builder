import React from 'react';

import { AppService } from 'entities/app';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { PrivacySettingsWidget, AppSettingsWidget, CheckUpdateWidget, ProfileSettingsWidget } from '../widgets';

function SettingsPage() {
    const items = [
        { id: 0, element: <ProfileSettingsWidget /> },
        { id: 1, element: <PrivacySettingsWidget /> },
        { id: 2, element: <AppSettingsWidget /> },
        { id: 3, element: AppService.tauriIsRunning ? <CheckUpdateWidget /> : null },
    ];

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.body}>
                {items.map((i) => (
                    <div key={i.id} className={styles.row} style={{ display: !AppService.tauriIsRunning && i.id === 3 ? 'none' : 'flex' }}>
                        {i.element}
                    </div>
                ))}
            </div>
        </Box.Animated>
    );
}

export default SettingsPage;
