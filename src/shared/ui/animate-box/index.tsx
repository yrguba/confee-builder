import { motion, AnimatePresence, AnimationProps, AnimatePresenceProps, MotionProps } from 'framer-motion';
import React, { ReactNode, HTMLAttributes } from 'react';

import { visibleHidden, AnimationVariant, autoHeight } from './variants';

type Props = {
    children: ReactNode;
    isVisible: boolean;
    animationVariant?: AnimationVariant;
    presence?: boolean;
    presenceProps?: AnimatePresenceProps;
} & HTMLAttributes<HTMLDivElement> &
    AnimationProps &
    MotionProps;

function AnimateBox(props: Props) {
    const { children, isVisible, animationVariant = 'visible-hidden', presence = true, presenceProps, ...motionDivAttrs } = props;

    const variantDictionary = {
        'visible-hidden': visibleHidden,
        'auto-height': autoHeight,
    };

    const motionDiv = (
        <motion.div {...variantDictionary[animationVariant]} {...motionDivAttrs}>
            {children}
        </motion.div>
    );

    if (presence) {
        return <AnimatePresence {...presenceProps}>{isVisible ? motionDiv : null}</AnimatePresence>;
    }
    return isVisible ? motionDiv : null;
}

export default AnimateBox;
