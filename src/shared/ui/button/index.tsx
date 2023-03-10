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
    circle?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: Props) {
    const { children, disabled, loading, error, size = 'm', active, circle, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {
        circle,
        active,
        disabled,
        loading,
        error,
        [`size-circle-${size}`]: circle && size,
        [`size-${size}`]: !circle && size,
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
