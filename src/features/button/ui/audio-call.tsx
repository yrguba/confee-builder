import React from 'react';

import { Button } from 'shared/ui';

type Props = {};

function AudioCallBtn(props: Props) {
    const icon = (
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#7B57C8" />
            <path
                d="M14.1667 13.332H17.5L19.1667 17.4987L17.0833 18.7487C17.9758 20.5583 19.4404 22.0229 21.25 22.9154L22.5 20.832L26.6667 22.4987V25.832C26.6667 26.2741 26.4911 26.698 26.1785 27.0105C25.866 27.3231 25.442 27.4987 25 27.4987C21.7494 27.3012 18.6835 25.9208 16.3807 23.618C14.0779 21.3152 12.6975 18.2493 12.5 14.9987C12.5 14.5567 12.6756 14.1327 12.9882 13.8202C13.3007 13.5076 13.7246 13.332 14.1667 13.332"
                stroke="#ffff"
                strokeWidth="1.5"
                fill="#7B57C8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return <Button.Circle active>{icon}</Button.Circle>;
}

export default AudioCallBtn;
