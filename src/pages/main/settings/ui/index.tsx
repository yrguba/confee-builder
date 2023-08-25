import React from 'react';

import { appService } from 'entities/app';
import { AppSettings, CheckUpdate } from 'features/app';
import { ViewerProfile } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function SettingsPage() {
    const items = [
        { id: 0, element: <ViewerProfile /> },
        { id: 1, element: <AppSettings /> },
        { id: 2, element: <CheckUpdate />, hidden: !appService.tauriIsRunning },
    ];

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.body}>
                {items
                    .filter((i) => !i.hidden)
                    .map((i) => (
                        <div key={i.id} className={styles.row} style={{ display: !appService.tauriIsRunning && i.id === 3 ? 'none' : 'flex' }}>
                            {i.element}
                        </div>
                    ))}
            </div>
        </Box.Animated>
    );
}

export default SettingsPage;
