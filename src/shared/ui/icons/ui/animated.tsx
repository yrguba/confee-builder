import { motion } from 'framer-motion';
import React from 'react';

import { ArrowAnimatedProps, BroomAnimatedProps } from '../types';

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

export function BroomAnimated(props: BroomAnimatedProps) {
    const { activeAnimate } = props;

    return (
        <motion.svg
            width="24.000000"
            height="24.000000"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            transition={{ type: 'tween', ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 0, duration: 0.3 }}
            // initial={{ rotate: 0 }}
            animate={activeAnimate ? { rotate: [-30, 30] } : {}}
        >
            <desc>Created with Pixso.</desc>
            <defs />
            <path
                id="Color"
                d="M14.6665 11.0913L15.5557 11.0913C18.0088 11.0913 20 13.1279 20 15.6367L20 22.0005L4 22.0005L4 15.6367C4 13.1279 5.99121 11.0913 8.44434 11.0913L9.3335 11.0913L9.3335 3.81885C9.3335 2.81885 10.1333 2.00049 11.1113 2.00049L12.8887 2.00049C13.8667 2.00049 14.6665 2.81885 14.6665 3.81885L14.6665 11.0913ZM12.8887 3.81885L11.1113 3.81885L11.1113 11.0913L12.8887 11.0913L12.8887 3.81885ZM16.4443 20.1821L18.2222 20.1821L18.2222 15.6367C18.2222 14.1367 17.0225 12.9097 15.5557 12.9097L8.44434 12.9097C6.97754 12.9097 5.77783 14.1367 5.77783 15.6367L5.77783 20.1821L7.55566 20.1821L7.55566 17.4551C7.55566 16.9551 7.95557 16.5459 8.44434 16.5459C8.93311 16.5459 9.3335 16.9551 9.3335 17.4551L9.3335 20.1821L11.1113 20.1821L11.1113 17.4551C11.1113 16.9551 11.5112 16.5459 12 16.5459C12.4888 16.5459 12.8887 16.9551 12.8887 17.4551L12.8887 20.1821L14.6665 20.1821L14.6665 17.4551C14.6665 16.9551 15.0669 16.5459 15.5557 16.5459C16.0444 16.5459 16.4443 16.9551 16.4443 17.4551L16.4443 20.1821Z"
                clipRule="evenodd"
                fill="#7B57C8"
                fillOpacity="1.000000"
                fillRule="evenodd"
            />
        </motion.svg>
    );
}
