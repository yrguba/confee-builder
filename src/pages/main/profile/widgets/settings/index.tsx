import React from 'react';

import { appService } from 'entities/app';
import { AppSettings, TauriSettings } from 'features/app';
import { ProfileSettings } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Settings() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.item}>
                <ProfileSettings />
            </div>
            <div className={styles.item}>
                <AppSettings />
            </div>
            {appService.tauriIsRunning && (
                <div className={styles.item}>
                    <TauriSettings />
                </div>
            )}
        </Box.Animated>
    );
}

export default Settings;
