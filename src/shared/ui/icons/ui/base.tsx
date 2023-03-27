import React from 'react';

import { BaseIconsProps } from '../types';

function BaseIcons(props: BaseIconsProps) {
    const { variants, color = 'var(--button-inactive)', size = 16 } = props;

    switch (variants) {
        case 'exit': {
            return (
                <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9961 2.00488L2.0061 13.9949" stroke="#C3C4E4" strokeWidth="3.75313" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 14.0025L2 2" stroke="#C3C4E4" strokeWidth="3.75313" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }

        default:
            return null;
    }
}

export default BaseIcons;
