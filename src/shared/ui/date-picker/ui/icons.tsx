import React from 'react';

type Props = {
    variants: 'calendar';
};

function BaseIcons(props: Props) {
    const { variants } = props;

    switch (variants) {
        case 'calendar': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 22V19H14V17H17V14H19V17H22V19H19V22H17ZM5 20C4.45 20 3.979 19.804 3.587 19.412C3.195 19.02 2.99934 18.5493 3 18V6C3 5.45 3.196 4.979 3.588 4.587C3.98 4.195 4.45067 3.99933 5 4H6V2H8V4H14V2H16V4H17C17.55 4 18.021 4.196 18.413 4.588C18.805 4.98 19.0007 5.45067 19 6V12.1C18.6667 12.05 18.3333 12.025 18 12.025C17.6667 12.025 17.3333 12.05 17 12.1V10H5V18H12C12 18.3333 12.025 18.6667 12.075 19C12.125 19.3333 12.2167 19.6667 12.35 20H5Z"
                        fill="#C3C4E4"
                    />
                </svg>
            );
        }
        default:
            return null;
    }
}

export default BaseIcons;
