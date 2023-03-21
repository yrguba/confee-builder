import { motion } from 'framer-motion';
import React from 'react';

import { BaseIconsProps } from '../types';

function BaseIcons(props: BaseIconsProps) {
    const { variants, color = 'var(--button-inactive)' } = props;

    switch (variants) {
        case 'exit': {
            return (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.99755 1.00342L1.00423 8.99675" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 9.00167L1 1" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }

        default:
            return null;
    }
}

export default BaseIcons;
