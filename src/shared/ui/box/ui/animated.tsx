import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import * as animationVariants from '../animation-variants';
import { AnimatedBoxProps } from '../types';

function AnimatedBox(props: AnimatedBoxProps) {
    const { children, visible, animationVariant = 'visibleHidden', presence = true, presenceProps, ...motionDivAttrs } = props;

    const vars: Record<keyof typeof animationVariants, object> = animationVariants;

    const variant = vars[animationVariant];

    const motionDiv = (
        <motion.div style={{ overflow: 'hidden' }} {...variant} {...motionDivAttrs}>
            {children}
        </motion.div>
    );

    if (presence) {
        return <AnimatePresence {...presenceProps}>{visible ? motionDiv : null}</AnimatePresence>;
    }
    return visible ? motionDiv : null;
}

export default AnimatedBox;
