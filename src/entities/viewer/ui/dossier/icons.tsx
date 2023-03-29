import React from 'react';

type Props = {
    variants: 'logout';
};

function Icons(props: Props) {
    const { variants } = props;

    switch (variants) {
        case 'logout': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.22222 22C3.63285 22 3.06762 21.7659 2.65087 21.3491C2.23413 20.9324 2 20.3671 2 19.7778V6.44444C2 5.85507 2.23413 5.28984 2.65087 4.8731C3.06762 4.45635 3.63285 4.22222 4.22222 4.22222H9.77778V6.44444H4.22222V19.7778H17.5556V14.2222H19.7778V19.7778C19.7778 20.3671 19.5437 20.9324 19.1269 21.3491C18.7102 21.7659 18.1449 22 17.5556 22H4.22222ZM10.1 12.3256L18.2033 4.22222H13.1111V2H22V10.8889H19.7778V5.79444L11.6667 13.8967L10.1 12.3256Z"
                        fill="#7B57C8"
                    />
                </svg>
            );
        }
        default:
            return null;
    }
}

export default Icons;
