import React from 'react';

import { AppSettings } from 'features/app';
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
        </Box.Animated>
    );
}

export default Settings;
