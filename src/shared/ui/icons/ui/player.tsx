import React from 'react';

import { PlayerIconsProps } from '../types';

function Player(props: PlayerIconsProps) {
    const { variant } = props;

    switch (variant) {
        case 'play': {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    enableBackground="new 0 0 512 512"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                >
                    <path d="M405.2 232.9L126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z" />
                </svg>
            );
        }
        case 'pause': {
            return (
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M272 63.1h-32c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48l32 1.8c26.51 0 48-21.49 48-48V112c0-26.51-21.5-48.9-48-48.9zm-192 0H48c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448h32c26.51 0 48-21.49 48-48V112c0-26.51-21.5-48.9-48-48.9z" />
                </svg>
            );
        }
        case 'stop': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M6 5h12a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1z" />
                </svg>
            );
        }
        default:
            return null;
    }
}

export default Player;
