import cn from 'classnames';
import cnBind from 'classnames/bind';
import React from 'react';

import styles from './styles.module.scss';
import Box from '../../box';
import { TitleProps } from '../types';

function Title(props: TitleProps) {
    const { children, isError, textWrap, primary = true, variant, textAlign, animateTrigger, active = false } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('wrapper', {
            error: isError,
            [variant]: variant,
            primary,
            textWrap,
            active,
        })
    );

    return animateTrigger === undefined ? (
        <div style={{ textAlign }} className={classes}>
            {children}
        </div>
    ) : (
        <Box.Animated key={animateTrigger} style={{ textAlign }} className={classes} visible>
            {children}
        </Box.Animated>
    );
}

export default Title;
