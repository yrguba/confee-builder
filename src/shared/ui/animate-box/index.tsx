import { motion, AnimatePresence, AnimationProps, AnimatePresenceProps, MotionProps } from 'framer-motion';
import React, { ReactNode, HTMLAttributes } from 'react';

import { visibleHidden } from './variants';

type AnimateVariant = 'visible-hidden';

type Props = {
    children: ReactNode;
    isVisible: boolean;
    variant?: AnimateVariant;
    presence?: boolean;
    presenceProps?: AnimatePresenceProps;
} & HTMLAttributes<HTMLDivElement> &
    AnimationProps &
    MotionProps;

function AnimateBox(props: Props) {
    const { children, isVisible, variant = 'visible-hidden', presence = false, presenceProps, ...motionDivAttrs } = props;

    const variantDictionary = {
        'visible-hidden': visibleHidden,
    };

    const motionDiv = (
        <motion.div {...variantDictionary[variant]} {...motionDivAttrs}>
            {children}
        </motion.div>
    );

    if (presence) {
        return <AnimatePresence {...presenceProps}>{isVisible ? motionDiv : null}</AnimatePresence>;
    }
    return isVisible ? motionDiv : null;
}

export default AnimateBox;
