import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import Glare from '../../../loading-indicator/ui/glare';
import { BaseButtonProps } from '../../types';

function BaseButton(props: BaseButtonProps) {
    const {
        children,
        disabled,
        loading,
        variant = 'primary',
        prefixIcon,
        chips,
        error,
        size = 's',
        width = '100%',
        animateTrigger,
        height,
        active,
        direction = 'horizontal',
        redText,
        ...other
    } = props;

    const classes = useStyles(styles, 'wrapper', {
        disabled: disabled || loading,
        error,
        [variant]: variant,
        [`${variant}_active`]: variant && active,
        chips,
        [direction]: direction,
        [`size-${size}`]: size,
        redText,
    });

    return (
        <button className={classes} {...other} style={{ width, height }}>
            {animateTrigger === undefined ? (
                <>
                    {prefixIcon}
                    {children}
                    <Glare visible={!!loading} />
                </>
            ) : (
                <Box.Animated key={animateTrigger} className={styles.animateContent} visible>
                    {prefixIcon}
                    {children}
                    <Glare visible={!!loading} />
                </Box.Animated>
            )}
        </button>
    );
}

export default BaseButton;
