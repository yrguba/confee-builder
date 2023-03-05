import { motion } from 'framer-motion';
import React, { ReactNode, ButtonHTMLAttributes, memo } from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    loading?: boolean;
    error?: boolean;
    size?: number | 's' | 'm' | 'l' | 'xl';
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: Props) {
    const { children, disabled, loading, error, size, active, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        active,
        disabled,
        loading,
        error,
        [`size-${size}`]: size,
    });

    return (
        <button className={classes} {...other}>
            <motion.div className={styles.content}>
                {children}
                {loading && <span className={styles.loadingAnimation} />}
            </motion.div>
        </button>
    );
}

export default Button;
