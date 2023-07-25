import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Glare from '../../../loading-indicator/ui/glare';
import { ButtonBaseProps } from '../../types';

function BaseButton(props: ButtonBaseProps) {
    const { children, disabled, loading, primary, error, size, active, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        active,
        disabled: disabled || loading,
        error,
        primary,
        [`size-${size}`]: size,
    });

    return (
        <button className={classes} {...other}>
            {children}
            <Glare visible={!!loading} />
        </button>
    );
}

export default BaseButton;
