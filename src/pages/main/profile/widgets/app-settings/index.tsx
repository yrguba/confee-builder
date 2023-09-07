import React from 'react';

import { appService } from 'entities/app';
import * as AppFeatures from 'features/app';
import { ProfileSettings } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function AppSettings() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            {appService.tauriIsRunning && (
                <div className={styles.item}>
                    <AppFeatures.TauriSettings />
                </div>
            )}
            <div className={styles.item}>
                <AppFeatures.AppSettings />
            </div>
        </Box.Animated>
    );
}

export default AppSettings;
