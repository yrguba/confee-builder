import React from 'react';

import { Button } from '../../../shared/ui';

function VideoCallBtn() {
    const icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
            <rect width="40" height="40" fill="#A5ABD7" rx="20" />
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M22.5 18.333l3.794-1.896a.834.834 0 011.206.744v5.637a.833.833 0 01-1.206.745L22.5 21.667v-3.334zM20.833 15h-6.666c-.92 0-1.667.746-1.667 1.667v6.666c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.746 1.667-1.667v-6.666c0-.92-.746-1.667-1.667-1.667z"
            />
        </svg>
    );

    return <Button.Circle>{icon}</Button.Circle>;
}

export default VideoCallBtn;
