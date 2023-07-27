import React from 'react';

import { AppService } from 'entities/app';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { PrivacySettings, AppSettings, CheckUpdate, ProfileSettings } from '../widgets';

function SettingsPage() {
    const items = [
        { id: 0, element: <ProfileSettings /> },
        { id: 1, element: <PrivacySettings /> },
        { id: 2, element: <AppSettings /> },
        { id: 3, element: AppService.tauriIsRunning ? <CheckUpdate /> : null },
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
