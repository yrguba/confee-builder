import React from 'react';

import { Button } from '../../../shared/ui';

function VideoCallBtn() {
    const icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.5 8.33319L16.2942 6.43652C16.4212 6.37305 16.5623 6.34309 16.7042 6.34948C16.846 6.35587 16.9839 6.39839 17.1047 6.47303C17.2255 6.54766 17.3252 6.65192 17.3944 6.77591C17.4636 6.89991 17.4999 7.03953 17.5 7.18152V12.8182C17.4999 12.9602 17.4636 13.0998 17.3944 13.2238C17.3252 13.3478 17.2255 13.4521 17.1047 13.5267C16.9839 13.6013 16.846 13.6438 16.7042 13.6502C16.5623 13.6566 16.4212 13.6267 16.2942 13.5632L12.5 11.6665V8.33319Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.8333 5H4.16667C3.24619 5 2.5 5.74619 2.5 6.66667V13.3333C2.5 14.2538 3.24619 15 4.16667 15H10.8333C11.7538 15 12.5 14.2538 12.5 13.3333V6.66667C12.5 5.74619 11.7538 5 10.8333 5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return <Button.Circle active>{icon}</Button.Circle>;
}

export default VideoCallBtn;
