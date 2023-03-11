import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { Glare } from '../../../loading';
import { ButtonBaseProps } from '../../types';

function ButtonBase(props: ButtonBaseProps) {
    const { children, disabled, loading, error, size, active, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        active,
        disabled: disabled || loading,
        error,
        [`size-${size}`]: size,
    });

    return (
        <button className={classes} {...other}>
            {children}
            <Glare visible={!!loading} />
        </button>
    );
}

export default ButtonBase;
