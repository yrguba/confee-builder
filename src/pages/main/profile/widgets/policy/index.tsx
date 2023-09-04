import React from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Policy() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            Policy
        </Box.Animated>
    );
}

export default Policy;
