import cn from 'classnames';
import cnBind from 'classnames/bind';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import styles from './styles.module.scss';

type Props = {
    children: string | number | undefined;
    secondary?: boolean;
    isLoading?: boolean;
    isError?: boolean;
};

function Title(props: Props) {
    const { children, secondary, isLoading, isError, ...other } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('title', {
            secondary,
            loading: isLoading,
            error: isError,
        })
    );

    return (
        <AnimatePresence initial={false}>
            {children && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={classes} {...other}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Title;
