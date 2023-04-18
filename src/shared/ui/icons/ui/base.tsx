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
        case 'backArrow': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.49981 12.6992L14.0998 18.3992C14.4998 18.7992 15.0998 18.7992 15.4998 18.3992C15.8998 17.9992 15.8998 17.3992 15.4998 16.9992L10.5998 12.0992L15.4998 7.19922C15.6998 6.99922 15.7998 6.79922 15.7998 6.49922C15.7998 5.89922 15.3998 5.49922 14.7998 5.49922C14.4998 5.49922 14.2998 5.59922 14.0998 5.79922L8.3998 11.4992C8.0998 11.6992 8.0998 12.2992 8.49981 12.6992Z"
                        fill={color || '#717394'}
                    />
                </svg>
            );
        }
        case 'menu': {
            return (
                <svg
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 32 32"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                >
                    <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z" />
                </svg>
            );
        }
        case 'filter': {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_8145_15813)">
                        <path
                            d="M11.6667 20C11.4864 20 11.311 19.9415 11.1667 19.8333L7.8334 17.3333C7.7299 17.2557 7.6459 17.1551 7.58804 17.0393C7.53019 16.9236 7.50007 16.796 7.50007 16.6667V11.9833L1.6534 5.40583C1.23817 4.9374 0.967048 4.35901 0.872632 3.7402C0.778216 3.12138 0.864519 2.48846 1.12117 1.91751C1.37782 1.34656 1.79389 0.861882 2.31938 0.521721C2.84487 0.181561 3.45742 0.000395349 4.0834 0L15.9167 0C16.5427 0.000734209 17.1551 0.182199 17.6803 0.522589C18.2056 0.862978 18.6214 1.34781 18.8778 1.91882C19.1342 2.48983 19.2202 3.12273 19.1255 3.74146C19.0309 4.36018 18.7596 4.93841 18.3442 5.40667L12.5001 11.9833V19.1667C12.5001 19.3877 12.4123 19.5996 12.256 19.7559C12.0997 19.9122 11.8877 20 11.6667 20Z"
                            fill="#717394"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_8145_15813">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );
        }
        default:
            return null;
    }
}

export default BaseIcons;
