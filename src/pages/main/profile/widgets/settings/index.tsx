import React from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Settings() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            Settings
        </Box.Animated>
    );
}

export default Settings;
