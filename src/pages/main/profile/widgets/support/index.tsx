import React from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Support() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            Support
        </Box.Animated>
    );
}

export default Support;
