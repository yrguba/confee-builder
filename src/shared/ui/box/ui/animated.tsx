import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { visibleHidden, autoHeight } from '../animation-variants';
import { AnimatedBoxProps } from '../types';

function AnimatedBox(props: AnimatedBoxProps) {
    const { children, visible, animationVariant = 'visible-hidden', presence = true, presenceProps, ...motionDivAttrs } = props;

    const variantDictionary = {
        'visible-hidden': visibleHidden,
        'auto-height': autoHeight,
    };

    const variant = variantDictionary[animationVariant];

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
