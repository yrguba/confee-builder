import React from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Main() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            Maina
        </Box.Animated>
    );
}

export default Main;
