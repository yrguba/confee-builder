import { motion, AnimatePresence } from 'framer-motion';
import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { useRouter } from '../../../hooks';
import Button from '../../button';
import Icons from '../../icons';
import LoadingIndicator from '../../loading-indicator';
import * as animationVariants from '../animation-variants';
import { AnimatedBoxProps } from '../types';

const AnimatedBox = forwardRef((props: AnimatedBoxProps, ref: any) => {
    const { trigger, children, visible, animationVariant = 'visibleHidden', presence = true, presenceProps, loading, backBtn, ...motionDivAttrs } = props;
    const { navigate } = useRouter();
    const vars: Record<keyof typeof animationVariants, object> = animationVariants;

    const variant = vars[animationVariant];

    const motionDiv = (
        <motion.div key={String(trigger)} ref={ref} {...variant} {...motionDivAttrs} className={`${styles.wrapper} ${motionDivAttrs.className}`}>
            {backBtn && (
                <Button.Circle onClick={() => navigate(-1)} variant="inherit" className={styles.backBtn}>
                    <Icons variant="arrow-left" />
                </Button.Circle>
            )}
            {children}
        </motion.div>
    );

    const load = (
        <motion.div style={{ overflow: 'hidden' }} className={styles.animateLoading} {...variant} {...motionDivAttrs}>
            <LoadingIndicator visible />
        </motion.div>
    );

    if (presence) {
        return <AnimatePresence mode="wait">{visible ? (loading ? load : motionDiv) : null}</AnimatePresence>;
    }
    return visible ? motionDiv : null;
});

export default AnimatedBox;
