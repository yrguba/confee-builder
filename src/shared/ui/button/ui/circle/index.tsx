import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { Glare } from '../../../loading';
import { ButtonCircleProps } from '../../types';

function ButtonCircle(props: ButtonCircleProps) {
    const { children, disabled, loading, error, radius, active, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        active,
        disabled: disabled || loading,
        error,
    });

    return (
        <button className={classes} {...other}>
            {children}
            <Glare visible={!!loading} />
        </button>
    );
}

export default ButtonCircle;
