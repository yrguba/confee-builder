import { motion } from 'framer-motion';
import React from 'react';

import { ArrowAnimatedProps } from '../types';

export function ArrowAnimated(props: ArrowAnimatedProps) {
    const { initialDeg, animateDeg, activeAnimate } = props;

    return (
        <motion.svg
            initial={{ rotate: initialDeg }}
            animate={{ rotate: activeAnimate ? animateDeg : initialDeg }}
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1.5 11L6.5 6L1.5 1" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
    );
}
