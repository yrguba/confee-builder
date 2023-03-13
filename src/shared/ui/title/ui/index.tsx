import cn from 'classnames';
import cnBind from 'classnames/bind';
import React from 'react';

import styles from './styles.module.scss';
import Box from '../../box';
import { Props } from '../types';

function Title(props: Props) {
    const { children, secondary, isLoading, isError, animation = false, size, align, width, ...other } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('title', {
            hiddenWithDots: width,
            secondary,
            loading: isLoading,
            error: isError,
        })
    );

    return animation ? (
        <Box.Animated
            visible={!!children}
            style={{ justifyContent: align, width: width || 'auto', fontSize: size, height: size ? size + 4 : 20 }}
            className={classes}
            {...other}
        >
            {children}
        </Box.Animated>
    ) : (
        <div className={classes} style={{ justifyContent: align, width: width || 'auto', fontSize: size, height: size ? size + 4 : 20 }} {...other}>
            {children}
        </div>
    );
}

export default Title;
