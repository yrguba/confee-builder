import React from 'react';

import { DocumentIconsProps } from '../types';

function Document(props: DocumentIconsProps) {
    const { variant } = props;

    switch (variant) {
        case 'pptx': {
            return (
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 6.5C0 3.18629 2.68629 0.5 6 0.5H25L31.278 6.25482L37 11.5V31.5C37 34.8137 34.3137 37.5 31 37.5H6C2.68629 37.5 0 34.8137 0 31.5V6.5Z"
                        fill="#FF4B4B"
                    />
                </svg>
            );
        }
        case 'doc': {
            return (
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 6.5C0 3.18629 2.68629 0.5 6 0.5H25L31.278 6.25482L37 11.5V31.5C37 34.8137 34.3137 37.5 31 37.5H6C2.68629 37.5 0 34.8137 0 31.5V6.5Z"
                        fill="#FF4B4B"
                    />
                </svg>
            );
        }
        case 'xls': {
            return (
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 6.5C0 3.18629 2.68629 0.5 6 0.5H25L31.278 6.25482L37 11.5V31.5C37 34.8137 34.3137 37.5 31 37.5H6C2.68629 37.5 0 34.8137 0 31.5V6.5Z"
                        fill="#FF4B4B"
                    />
                </svg>
            );
        }

        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" version="1.1" viewBox="0 0 48 48" xmlSpace="preserve">
                    <path
                        fillRule="evenodd"
                        d="M37 47H11a4 4 0 01-4-4V5a4 4 0 014-4h19c.32 0 .593.161.776.395l9.829 9.829A.981.981 0 0141 12v31a4 4 0 01-4 4zM31 4.381V11h6.619L31 4.381zM39 13h-9a1 1 0 01-1-1V3H11a2 2 0 00-2 2v38a2 2 0 002 2h26a2 2 0 002-2V13zm-6 26H15a1 1 0 110-2h18a1 1 0 110 2zm0-8H15a1 1 0 110-2h18a1 1 0 110 2zm0-8H15a1 1 0 110-2h18a1 1 0 110 2z"
                        clipRule="evenodd"
                        fill="var(--main-active)"
                    />
                </svg>
            );
    }
}

export default Document;
