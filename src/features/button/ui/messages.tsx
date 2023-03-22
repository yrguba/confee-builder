import React from 'react';

import { Button, Input } from 'shared/ui';

type Props = {};

function MessagesBtn(props: Props) {
    const icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
            <rect width="40" height="40" fill="#A5ABD7" rx="20" />
            <path
                fill="#A5ABD7"
                stroke="#fff"
                strokeWidth="1.5"
                d="M20 12.25h0a7.75 7.75 0 00-6.409 12.108l-.916.917s0 0 0 0A1.45 1.45 0 0013.7 27.75H20a7.75 7.75 0 100-15.5z"
            />
        </svg>
    );

    return <Button.Circle>{icon}</Button.Circle>;
}

export default MessagesBtn;
