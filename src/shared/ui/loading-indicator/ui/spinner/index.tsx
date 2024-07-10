import React from 'react';

import styles from './styles.module.scss';
import { useStyles } from '../../../../hooks';
import Box from '../../../box';
import { SpinnerProps } from '../../types';

function Spinner(props: SpinnerProps) {
    const { primary = true, visible, size = 30 } = props;

    const classes = useStyles(styles, 'spinner', {
        primary,
    });

    return (
        <Box.Animated visible={visible}>
            <svg className={classes} viewBox="0 0 50 50" width={size} height={size}>
                <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
        </Box.Animated>
    );
}

export default Spinner;
