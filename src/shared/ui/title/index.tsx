import cn from 'classnames';
import cnBind from 'classnames/bind';
import React from 'react';

import styles from './styles.module.scss';
import { Box } from '../index';

type Props = {
    children: string | number | undefined;
    secondary?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    animation?: boolean;
    size?: number;
    width?: number;
};

function Title(props: Props) {
    const { children, secondary, isLoading, isError, animation = false, size, width, ...other } = props;

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
        <Box.Animate isVisible={!!children} style={{ width: width || 'auto', fontSize: size }} className={classes} {...other}>
            {children}
        </Box.Animate>
    ) : (
        <div className={classes} style={{ width: width || 'auto', fontSize: size }} {...other}>
            {children}
        </div>
    );
}

export default Title;
