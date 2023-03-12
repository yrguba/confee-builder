import React from 'react';

import Animated from './animated';
import styles from './styles.module.scss';
import LoadingIndicator from '../../loading-indicator';
import { BaseBoxProps } from '../types';

function Base(props: BaseBoxProps) {
    const { children, loading, error, disabled, ...other } = props;

    const err = (
        <Animated visible={!!error} className={styles.error}>
            {error}
        </Animated>
    );
    const load = (
        <Animated visible={!!loading} className={styles.loading}>
            <LoadingIndicator visible />
        </Animated>
    );

    return (
        <div {...other}>
            {load}
            {err}
            {!loading && !error && children}
        </div>
    );
}

export default Base;
