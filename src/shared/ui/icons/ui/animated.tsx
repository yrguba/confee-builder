import { motion } from 'framer-motion';
import React from 'react';

import Icons from '../index';
import { ArrowAnimatedProps, BroomAnimatedProps, CallAnimatedProps } from '../types';

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
            transition={activeAnimate ? { type: 'tween', ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 0, duration: 0.3 } : {}}
            initial={{ rotate: 0 }}
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

export function CallAnimated(props: CallAnimatedProps) {
    const { activeAnimate, size = 30 } = props;

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icons variant="call" />
            {activeAnimate && (
                <svg
                    style={{ position: 'absolute', top: -1, left: 18 }}
                    width="13"
                    height="13"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        animate={{ opacity: [0, 1] }}
                        transition={{
                            type: 'tween',
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatType: 'reverse',
                            repeatDelay: 0.4,
                            duration: 0.3,
                            delay: 0.4,
                        }}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.40503 7.59474C11.5125 9.70226 12.7509 12.1884 13.1201 15.0531C13.2528 16.0834 14.0798 16.9295 15.1187 16.9295C16.1576 16.9295 17.0116 16.0848 16.9015 15.0518C16.725 13.3961 16.311 11.8196 15.6595 10.3223C14.766 8.26879 13.559 6.48179 12.0385 4.96127C10.518 3.44076 8.73099 2.23375 6.67751 1.34025C5.18017 0.688739 3.60367 0.274759 1.94799 0.0983082C0.914959 -0.0117842 0.0703125 0.842176 0.0703125 1.88105C0.0703125 2.91993 0.916353 3.74693 1.94671 3.87971C4.81141 4.24889 7.29752 5.48723 9.40503 7.59474Z"
                        fill="#29CC39"
                    />
                    <motion.path
                        animate={{ opacity: [0, 1] }}
                        transition={{
                            type: 'tween',
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatType: 'reverse',
                            repeatDelay: 0.4,
                            duration: 0.3,
                        }}
                        d="M7.59452 17C6.55564 17 5.75442 16.1345 5.42328 15.1498C5.15601 14.355 4.70409 13.6393 4.06755 13.0028C3.431 12.3662 2.71532 11.9143 1.92052 11.647C0.93583 11.3159 0.0703125 10.5147 0.0703125 9.4758C0.0703125 8.43692 0.920192 7.57183 1.94095 7.76499C3.75222 8.10773 5.34675 8.968 6.72453 10.3458C8.10232 11.7236 8.96258 13.3181 9.30533 15.1294C9.49848 16.1501 8.63339 17 7.59452 17Z"
                        fill="#29CC39"
                    />
                </svg>
            )}
        </div>
    );
}
