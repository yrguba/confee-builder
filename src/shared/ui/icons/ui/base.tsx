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
        case 'check': {
            return (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.47334 0.806696C9.41136 0.74421 9.33763 0.694614 9.25639 0.660768C9.17515 0.626922 9.08802 0.609497 9.00001 0.609497C8.912 0.609497 8.82486 0.626922 8.74362 0.660768C8.66238 0.694614 8.58865 0.74421 8.52667 0.806696L3.56001 5.78003L1.47334 3.6867C1.40899 3.62454 1.33303 3.57566 1.2498 3.54286C1.16656 3.51006 1.07768 3.49397 0.988222 3.49552C0.898768 3.49706 0.810495 3.51622 0.728443 3.55188C0.646391 3.58754 0.572166 3.63902 0.510007 3.70336C0.447848 3.76771 0.398972 3.84367 0.36617 3.92691C0.333367 4.01014 0.31728 4.09903 0.318828 4.18848C0.320375 4.27793 0.339527 4.36621 0.375189 4.44826C0.410852 4.53031 0.462326 4.60454 0.526674 4.6667L3.08667 7.2267C3.14865 7.28918 3.22238 7.33878 3.30362 7.37262C3.38486 7.40647 3.472 7.42389 3.56001 7.42389C3.64802 7.42389 3.73515 7.40647 3.81639 7.37262C3.89763 7.33878 3.97137 7.28918 4.03334 7.2267L9.47334 1.7867C9.54101 1.72427 9.59502 1.6485 9.63195 1.56417C9.66889 1.47983 9.68796 1.38876 9.68796 1.2967C9.68796 1.20463 9.66889 1.11356 9.63195 1.02923C9.59502 0.944892 9.54101 0.869124 9.47334 0.806696Z"
                        fill="#076ED1"
                    />
                </svg>
            );
        }
        case 'doubleCheck': {
            return (
                <div>
                    <svg style={{ marginRight: -7 }} width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.47334 0.806696C9.41136 0.74421 9.33763 0.694614 9.25639 0.660768C9.17515 0.626922 9.08802 0.609497 9.00001 0.609497C8.912 0.609497 8.82486 0.626922 8.74362 0.660768C8.66238 0.694614 8.58865 0.74421 8.52667 0.806696L3.56001 5.78003L1.47334 3.6867C1.40899 3.62454 1.33303 3.57566 1.2498 3.54286C1.16656 3.51006 1.07768 3.49397 0.988222 3.49552C0.898768 3.49706 0.810495 3.51622 0.728443 3.55188C0.646391 3.58754 0.572166 3.63902 0.510007 3.70336C0.447848 3.76771 0.398972 3.84367 0.36617 3.92691C0.333367 4.01014 0.31728 4.09903 0.318828 4.18848C0.320375 4.27793 0.339527 4.36621 0.375189 4.44826C0.410852 4.53031 0.462326 4.60454 0.526674 4.6667L3.08667 7.2267C3.14865 7.28918 3.22238 7.33878 3.30362 7.37262C3.38486 7.40647 3.472 7.42389 3.56001 7.42389C3.64802 7.42389 3.73515 7.40647 3.81639 7.37262C3.89763 7.33878 3.97137 7.28918 4.03334 7.2267L9.47334 1.7867C9.54101 1.72427 9.59502 1.6485 9.63195 1.56417C9.66889 1.47983 9.68796 1.38876 9.68796 1.2967C9.68796 1.20463 9.66889 1.11356 9.63195 1.02923C9.59502 0.944892 9.54101 0.869124 9.47334 0.806696Z"
                            fill="#076ED1"
                        />
                    </svg>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.47334 0.806696C9.41136 0.74421 9.33763 0.694614 9.25639 0.660768C9.17515 0.626922 9.08802 0.609497 9.00001 0.609497C8.912 0.609497 8.82486 0.626922 8.74362 0.660768C8.66238 0.694614 8.58865 0.74421 8.52667 0.806696L3.56001 5.78003L1.47334 3.6867C1.40899 3.62454 1.33303 3.57566 1.2498 3.54286C1.16656 3.51006 1.07768 3.49397 0.988222 3.49552C0.898768 3.49706 0.810495 3.51622 0.728443 3.55188C0.646391 3.58754 0.572166 3.63902 0.510007 3.70336C0.447848 3.76771 0.398972 3.84367 0.36617 3.92691C0.333367 4.01014 0.31728 4.09903 0.318828 4.18848C0.320375 4.27793 0.339527 4.36621 0.375189 4.44826C0.410852 4.53031 0.462326 4.60454 0.526674 4.6667L3.08667 7.2267C3.14865 7.28918 3.22238 7.33878 3.30362 7.37262C3.38486 7.40647 3.472 7.42389 3.56001 7.42389C3.64802 7.42389 3.73515 7.40647 3.81639 7.37262C3.89763 7.33878 3.97137 7.28918 4.03334 7.2267L9.47334 1.7867C9.54101 1.72427 9.59502 1.6485 9.63195 1.56417C9.66889 1.47983 9.68796 1.38876 9.68796 1.2967C9.68796 1.20463 9.66889 1.11356 9.63195 1.02923C9.59502 0.944892 9.54101 0.869124 9.47334 0.806696Z"
                            fill="#076ED1"
                        />
                    </svg>
                </div>
            );
        }
        case 'clock': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" data-name="Layer 1" viewBox="0 0 24 24">
                    <path
                        fill="#076ED1"
                        d="M15.098 12.634L13 11.423V7a1 1 0 00-2 0v5a1 1 0 00.5.866l2.598 1.5a1 1 0 101-1.732zM12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm0 18a8 8 0 118-8 8.01 8.01 0 01-8 8z"
                    />
                </svg>
            );
        }
        default:
            return null;
    }
}

export default BaseIcons;
