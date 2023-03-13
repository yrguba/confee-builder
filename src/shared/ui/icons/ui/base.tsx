import { motion } from 'framer-motion';
import React from 'react';

import { BaseIconsProps } from '../types';

function BaseIcons(props: BaseIconsProps) {
    const { variants, color = 'var(--white)', active } = props;

    switch (variants) {
        case 'arrow-right': {
            return (
                <motion.svg animate={{ rotate: active ? 90 : 0 }} width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 11L6.5 6L1.5 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
            );
        }
        case 'arrow-down': {
            return (
                <motion.svg animate={{ opacity: active ? 0 : 1 }} width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.1587 0.219669C10.4655 -0.0732236 10.963 -0.0732236 11.2699 0.219669C11.5767 0.512563 11.5767 0.987436 11.2699 1.28033L6.55559 5.78033C6.25813 6.06426 5.77917 6.0742 5.46908 5.80286L0.754792 1.67787C0.434913 1.39797 0.413303 0.923545 0.706526 0.618206C0.999748 0.312867 1.49677 0.29224 1.81664 0.572134L5.97637 4.2119L10.1587 0.219669Z"
                        fill={color}
                    />
                </motion.svg>
            );
        }

        default:
            return null;
    }
}

export default BaseIcons;
