import cn from 'classnames';
import cnBind from 'classnames/bind';
import { motion, AnimatePresence } from 'framer-motion';
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
};

function Title(props: Props) {
    const { children, secondary, isLoading, isError, animation = false, size, ...other } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('title', {
            secondary,
            loading: isLoading,
            error: isError,
        })
    );

    return animation ? (
        <Box.Animate isVisible={!!children} style={{ fontSize: size }} className={classes} {...other}>
            {children}
        </Box.Animate>
    ) : (
        <div className={classes} style={{ fontSize: size }} {...other}>
            {children}
        </div>
    );
}

export default Title;
