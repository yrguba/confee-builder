import React, { forwardRef } from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import Glare from '../../../loading-indicator/ui/glare';
import { BaseButtonProps } from '../../types';

const BaseButton = forwardRef((props: BaseButtonProps, ref: any) => {
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
        <button ref={ref} className={classes} {...other} style={{ width, height }}>
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
});

export default BaseButton;
