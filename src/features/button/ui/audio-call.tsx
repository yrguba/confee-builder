import React from 'react';

import { Button } from 'shared/ui';

type Props = {};

function AudioCallBtn(props: Props) {
    const icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.16667 3.33333H7.5L9.16667 7.5L7.08333 8.75C7.9758 10.5596 9.44039 12.0242 11.25 12.9167L12.5 10.8333L16.6667 12.5V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.866 17.3244 15.442 17.5 15 17.5C11.7494 17.3025 8.68346 15.9221 6.38069 13.6193C4.07792 11.3165 2.69754 8.25061 2.5 5C2.5 4.55797 2.67559 4.13405 2.98816 3.82149C3.30072 3.50893 3.72464 3.33333 4.16667 3.33333"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return <Button.Circle active>{icon}</Button.Circle>;
}

export default AudioCallBtn;
