import React from 'react';

import { Button } from 'shared/ui';

type Props = {};

function AudioCallBtn(props: Props) {
    const icon = (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#A5ABD7" />
            <path
                d="M14.1667 13.3334H17.5L19.1667 17.5L17.0833 18.75C17.9758 20.5596 19.4404 22.0242 21.25 22.9167L22.5 20.8334L26.6667 22.5V25.8334C26.6667 26.2754 26.4911 26.6993 26.1785 27.0119C25.866 27.3244 25.442 27.5 25 27.5C21.7494 27.3025 18.6835 25.9221 16.3807 23.6194C14.0779 21.3166 12.6975 18.2507 12.5 15C12.5 14.558 12.6756 14.1341 12.9882 13.8215C13.3007 13.509 13.7246 13.3334 14.1667 13.3334"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return <Button.Circle>{icon}</Button.Circle>;
}

export default AudioCallBtn;
