import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Glare from '../../../loading-indicator/ui/glare';
import { ButtonBaseProps } from '../../types';

function BaseButton(props: ButtonBaseProps) {
    const { children, disabled, loading, variant = 'primary', tag, prefixIcon, chips, error, size = 's', width = '100%', active, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        disabled: disabled || loading,
        error,
        [variant]: variant,
        chips,
        tag,
        [`size-${size}`]: size,
    });

    return (
        <button className={classes} {...other} style={{ width }}>
            {prefixIcon}
            {children}
            <Glare visible={!!loading} />
        </button>
    );
}

export default BaseButton;
