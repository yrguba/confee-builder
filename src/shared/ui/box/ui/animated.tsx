import { motion, AnimatePresence } from 'framer-motion';
import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import LoadingIndicator from '../../loading-indicator';
import * as animationVariants from '../animation-variants';
import { AnimatedBoxProps } from '../types';

const AnimatedBox = forwardRef((props: AnimatedBoxProps, ref: any) => {
    const { children, visible, animationVariant = 'visibleHidden', presence = true, presenceProps, loading, ...motionDivAttrs } = props;

    const vars: Record<keyof typeof animationVariants, object> = animationVariants;

    const variant = vars[animationVariant];

    const motionDiv = (
        <motion.div ref={ref} {...variant} {...motionDivAttrs}>
            {children}
        </motion.div>
    );

    const load = (
        <motion.div style={{ overflow: 'hidden' }} className={styles.animateLoading} {...variant} {...motionDivAttrs}>
            <LoadingIndicator visible />
        </motion.div>
    );

    if (presence) {
        return <AnimatePresence>{visible ? (loading ? load : motionDiv) : null}</AnimatePresence>;
    }
    return visible ? motionDiv : null;
});

export default AnimatedBox;
