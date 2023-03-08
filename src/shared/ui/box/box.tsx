import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AnimateBox from './animate-box';
import styles from './styles.module.scss';
import { BoxProps } from './types';

function Box(props: BoxProps) {
    const { children, loading, error, disabled, skeletonCount = 10, ...other } = props;

    const err = (
        <AnimateBox isVisible={!!error} className={styles.error}>
            {error}
        </AnimateBox>
    );
    const load = (
        <AnimateBox isVisible={!!loading} className={styles.loading}>
            <Skeleton count={skeletonCount} />
        </AnimateBox>
    );

    return (
        <SkeletonTheme width="90%" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)">
            <div {...other}>
                {load}
                {err}
                {!load && !error && children}
            </div>
        </SkeletonTheme>
    );
}

export default Box;
