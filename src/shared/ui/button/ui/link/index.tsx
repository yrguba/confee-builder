import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Glare from '../../../loading-indicator/ui/glare';
import { LinkButtonProps } from '../../types';

function LinkButton(props: LinkButtonProps) {
    const { children, disabled, loading, error, fontSize, fontWeight, active, prefixIcon, suffixIcon, gap, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        active,
        disabled,
        loading,
        error,
    });

    return (
        <button className={classes} {...other} style={{ fontSize, fontWeight, gap }}>
            {prefixIcon}
            {children}
            {suffixIcon}
            <Glare visible={!!loading} />
        </button>
    );
}

export default LinkButton;
