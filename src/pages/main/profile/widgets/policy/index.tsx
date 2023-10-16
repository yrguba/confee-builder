import React from 'react';
import { useWindowSize } from 'react-use';

import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Policy() {
    const { height } = useWindowSize();

    return (
        <Box.Animated visible className={styles.wrapper}>
            <iframe className={styles.frame} src="https://confee.ru/privacy.html" width="100%" height={height - 160} />
        </Box.Animated>
    );
}

export default Policy;
