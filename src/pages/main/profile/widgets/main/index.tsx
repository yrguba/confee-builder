import React from 'react';

import { ViewerProfile } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Main() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <ViewerProfile />
        </Box.Animated>
    );
}

export default Main;
