import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { WrapperProps } from '../../types';

function Wrapper(props: WrapperProps) {
    const { children, loading, active, disabled, error, size } = props;

    const classes = useStyles(styles, 'wrapper', {
        loading,
        error,
        [`size-${size}`]: size,
    });

    return <div className={classes}>{children}</div>;
}

export default Wrapper;
