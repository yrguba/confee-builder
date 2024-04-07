import React from 'react';

import { CanvasIconsProps, CountriesIconsProps } from '../types';

function Countries(props: CanvasIconsProps) {
    const { variant, active } = props;

    switch (variant) {
        case 'color': {
            return (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.5" cy="12" r="12" fill="url(#paint0_linear_2412_84383)" />
                    <defs>
                        <linearGradient id="paint0_linear_2412_84383" x1="12.5" y1="0" x2="12.5" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF0099" />
                            <stop offset="0.135" stopColor="#FDA3D9" />
                            <stop offset="0.28" stopColor="#6BA1F6" />
                            <stop offset="0.435" stopColor="#87F17D" />
                            <stop offset="0.68" stopColor="#DEEC36" />
                            <stop offset="0.825" stopColor="#F9987A" />
                            <stop offset="1" stopColor="#FF0000" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        }
        case 'pencil': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.99027 21.568C7.25143 21.6969 6.48929 21.6438 5.70385 21.4086C4.91841 21.1734 4.25247 20.799 3.70604 20.2853C4.13293 20.2108 4.53866 19.9666 4.92324 19.5527C5.30782 19.1387 5.44425 18.6116 5.33253 17.9713C5.1893 17.1504 5.35488 16.4024 5.82927 15.7275C6.30366 15.0526 6.95132 14.6435 7.77226 14.5003C8.59319 14.3571 9.34111 14.5227 10.016 14.997C10.6909 15.4714 11.1 16.1191 11.2432 16.94C11.4323 18.0237 11.2083 19.0186 10.5713 19.9249C9.93424 20.8313 9.0739 21.3789 7.99027 21.568ZM7.64652 19.5978C8.18833 19.5032 8.6185 19.2294 8.93702 18.7762C9.25554 18.3231 9.36753 17.8256 9.273 17.2838C9.2243 17.0047 9.08908 16.7872 8.86732 16.6313C8.64556 16.4754 8.39513 16.4218 8.11601 16.4705C7.83689 16.5192 7.6194 16.6545 7.46353 16.8762C7.30765 17.098 7.25407 17.3484 7.30277 17.6275C7.36865 18.0052 7.38366 18.3578 7.34778 18.6855C7.31191 19.0132 7.24443 19.3296 7.14536 19.6345C7.23319 19.653 7.31814 19.6551 7.40024 19.6407L7.64652 19.5978ZM13.3077 13.2455C12.7799 13.9902 11.7516 14.1725 10.9999 13.6546C10.237 13.1289 10.0486 12.0822 10.5804 11.3235L16.9099 2.2919C17.059 2.07979 17.2683 1.94599 17.5378 1.89052C17.8072 1.83504 18.0577 1.88863 18.2891 2.05128L19.4461 2.86461C19.6775 3.02725 19.8161 3.23993 19.8619 3.50263C19.9078 3.76532 19.8494 4.01237 19.6867 4.24377L13.3077 13.2455Z"
                        fill={active ? '#7B57C8' : '#A5ABD7'}
                    />
                </svg>
            );
        }
        case 'arrow': {
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.664879 9.78599C0.696784 9.28733 1.09188 8.88875 1.59024 8.85248L1.7121 8.84361C2.3169 8.79958 2.82138 9.29966 2.78266 9.90482L2.65288 11.9332L14.1431 0.443019C14.5336 0.052495 15.1668 0.0524953 15.5573 0.44302C15.9478 0.833544 15.9478 1.46671 15.5573 1.85723L4.0671 13.3474L6.08182 13.2305C6.68481 13.1955 7.18094 13.699 7.13709 14.3014L7.1279 14.4277C7.09155 14.9271 6.69143 15.3227 6.19164 15.3533L0.285548 15.7147L0.664879 9.78599Z"
                        fill={active ? '#7B57C8' : '#A5ABD7'}
                    />
                </svg>
            );
        }
        case 'rect': {
            return (
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.5 18C1.95 18 1.47917 17.8042 1.0875 17.4125C0.695833 17.0208 0.5 16.55 0.5 16V2C0.5 1.45 0.695833 0.979167 1.0875 0.5875C1.47917 0.195833 1.95 0 2.5 0H16.5C17.05 0 17.5208 0.195833 17.9125 0.5875C18.3042 0.979167 18.5 1.45 18.5 2V16C18.5 16.55 18.3042 17.0208 17.9125 17.4125C17.5208 17.8042 17.05 18 16.5 18H2.5ZM2.5 16H16.5V2H2.5V16Z"
                        fill={active ? '#7B57C8' : '#A5ABD7'}
                    />
                </svg>
            );
        }
        case 'circle': {
            return (
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.5 20C9.11667 20 7.81667 19.7375 6.6 19.2125C5.38333 18.6875 4.325 17.975 3.425 17.075C2.525 16.175 1.8125 15.1167 1.2875 13.9C0.7625 12.6833 0.5 11.3833 0.5 10C0.5 8.61667 0.7625 7.31667 1.2875 6.1C1.8125 4.88333 2.525 3.825 3.425 2.925C4.325 2.025 5.38333 1.3125 6.6 0.7875C7.81667 0.2625 9.11667 0 10.5 0C11.8833 0 13.1833 0.2625 14.4 0.7875C15.6167 1.3125 16.675 2.025 17.575 2.925C18.475 3.825 19.1875 4.88333 19.7125 6.1C20.2375 7.31667 20.5 8.61667 20.5 10C20.5 11.3833 20.2375 12.6833 19.7125 13.9C19.1875 15.1167 18.475 16.175 17.575 17.075C16.675 17.975 15.6167 18.6875 14.4 19.2125C13.1833 19.7375 11.8833 20 10.5 20ZM10.5 18C12.7333 18 14.625 17.225 16.175 15.675C17.725 14.125 18.5 12.2333 18.5 10C18.5 7.76667 17.725 5.875 16.175 4.325C14.625 2.775 12.7333 2 10.5 2C8.26667 2 6.375 2.775 4.825 4.325C3.275 5.875 2.5 7.76667 2.5 10C2.5 12.2333 3.275 14.125 4.825 15.675C6.375 17.225 8.26667 18 10.5 18Z"
                        fill={active ? '#7B57C8' : '#A5ABD7'}
                    />
                </svg>
            );
        }
        case 'undo': {
            return (
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.1 15C11.7167 15 13.1042 14.475 14.2625 13.425C15.4208 12.375 16 11.0667 16 9.5C16 7.93333 15.4208 6.625 14.2625 5.575C13.1042 4.525 11.7167 4 10.1 4H3.8L5.7 2.1C6.0866 1.7134 6.0866 1.0866 5.7 0.7V0.7C5.3134 0.313401 4.6866 0.313401 4.3 0.7L0 5L4.3 9.3C4.6866 9.6866 5.3134 9.6866 5.7 9.3V9.3C6.0866 8.9134 6.0866 8.2866 5.7 7.9L3.8 6H10.1C11.15 6 12.0625 6.33333 12.8375 7C13.6125 7.66667 14 8.5 14 9.5C14 10.5 13.6125 11.3333 12.8375 12C12.0625 12.6667 11.15 13 10.1 13H4C3.44771 13 3 13.4477 3 14V14C3 14.5523 3.44772 15 4 15H10.1Z"
                        fill={active ? '#7B57C8' : '#A5ABD7'}
                    />
                </svg>
            );
        }
        case 'redo': {
            return (
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.9 15C4.28333 15 2.89583 14.475 1.7375 13.425C0.579167 12.375 0 11.0667 0 9.5C0 7.93333 0.579167 6.625 1.7375 5.575C2.89583 4.525 4.28333 4 5.9 4H12.2L10.3 2.1C9.9134 1.7134 9.9134 1.0866 10.3 0.7V0.7C10.6866 0.313401 11.3134 0.313401 11.7 0.7L16 5L11.7 9.3C11.3134 9.6866 10.6866 9.6866 10.3 9.3V9.3C9.9134 8.9134 9.9134 8.2866 10.3 7.9L12.2 6H5.9C4.85 6 3.9375 6.33333 3.1625 7C2.3875 7.66667 2 8.5 2 9.5C2 10.5 2.3875 11.3333 3.1625 12C3.9375 12.6667 4.85 13 5.9 13H12C12.5523 13 13 13.4477 13 14V14C13 14.5523 12.5523 15 12 15H5.9Z"
                        fill={active ? '#7B57C8' : '#A5ABD7'}
                    />
                </svg>
            );
        }
        default:
            return null;
    }
}

export default Countries;
