import React from 'react';

import styles from './styles.module.scss';
import Box from '../../../box';
import { SpinnerProps } from '../../types';

function Spinner(props: SpinnerProps) {
    const { visible, size = 30 } = props;
    return (
        <Box.Animated visible={visible}>
            <svg className={styles.spinner} viewBox="0 0 50 50" width={size} height={size}>
                <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
        </Box.Animated>
    );
}

export default Spinner;
