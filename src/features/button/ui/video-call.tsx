import React from 'react';

import { Button } from '../../../shared/ui';

function VideoCallBtn() {
    const icon = (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#7B57C8" />
            <path
                d="M22.5 18.3322L26.2942 16.4355C26.4212 16.3721 26.5623 16.3421 26.7042 16.3485C26.846 16.3549 26.9839 16.3974 27.1047 16.472C27.2255 16.5467 27.3252 16.6509 27.3944 16.7749C27.4636 16.8989 27.4999 17.0386 27.5 17.1805V22.8172C27.4999 22.9592 27.4636 23.0988 27.3944 23.2228C27.3252 23.3468 27.2255 23.4511 27.1047 23.5257C26.9839 23.6003 26.846 23.6429 26.7042 23.6493C26.5623 23.6556 26.4212 23.6257 26.2942 23.5622L22.5 21.6655V18.3322Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#7B57C8"
            />
            <path
                d="M20.8333 15H14.1667C13.2462 15 12.5 15.7462 12.5 16.6667V23.3333C12.5 24.2538 13.2462 25 14.1667 25H20.8333C21.7538 25 22.5 24.2538 22.5 23.3333V16.6667C22.5 15.7462 21.7538 15 20.8333 15Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#7B57C8"
            />
        </svg>
    );

    return <Button.Circle active>{icon}</Button.Circle>;
}

export default VideoCallBtn;
