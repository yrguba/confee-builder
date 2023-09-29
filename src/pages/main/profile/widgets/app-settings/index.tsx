import React from 'react';

import { appService } from 'entities/app';
import * as AppFeatures from 'features/app';
import { ProfileSettings } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function AppSettings() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            {appService.tauriIsRunning && <AppFeatures.TauriSettings />}

            <AppFeatures.AppSettings />
        </Box.Animated>
    );
}

export default AppSettings;
