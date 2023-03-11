import React from 'react';

import AnimateBox from './animate-box';
import styles from './styles.module.scss';
import { BoxProps } from './types';
import { Spinner } from '../index';

function Box(props: BoxProps) {
    const { children, loading, error, disabled, ...other } = props;

    const err = (
        <AnimateBox isVisible={!!error} className={styles.error}>
            {error}
        </AnimateBox>
    );
    const load = (
        <AnimateBox isVisible={!!loading} className={styles.loading}>
            <Spinner />
        </AnimateBox>
    );

    return (
        <div {...other}>
            {load}
            {err}
            {!loading && !error && children}
        </div>
    );
}

export default Box;
