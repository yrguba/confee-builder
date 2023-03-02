import cn from 'classnames';
import cnBind from 'classnames/bind';
import { motion } from 'framer-motion';
import React, { ReactNode, ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    isDisabled?: boolean;
    isLoading?: boolean;
    isError?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: Props) {
    const { children, isDisabled, isLoading, isError, ...other } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('wrapper', {
            disabled: isDisabled,
            loading: isLoading,
            error: isError,
        })
    );

    return (
        <button className={classes} {...other}>
            <motion.div className={styles.content}>
                {children}
                {isLoading && <span className={styles.loadingAnimation} />}
            </motion.div>
        </button>
    );
}

export default Button;
