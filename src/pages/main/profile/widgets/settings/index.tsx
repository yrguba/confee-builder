import React from 'react';

import { SettingsProfile } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Settings() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <SettingsProfile />
        </Box.Animated>
    );
}

export default Settings;
