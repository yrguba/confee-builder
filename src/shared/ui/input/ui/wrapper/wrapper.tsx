import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import { WrapperProps } from '../../types';

function Wrapper(props: WrapperProps) {
    const { children, loading, title, errorTitle, active, disabled, width, height, error, size } = props;

    const classes = useStyles(styles, 'inputWrapper', {
        loading,
        error,
        [`size-${size}`]: size,
    });

    return (
        <div className={styles.wrapper} style={{ width, height }}>
            <div className={styles.title}>{title}</div>
            <div className={classes} style={{ width, height }}>
                {children}
            </div>
            <Box.Animated visible={!!errorTitle} className={styles.errorTitle}>
                {errorTitle}
            </Box.Animated>
        </div>
    );
}

export default Wrapper;
