import React from 'react';

import { PlayerIconsProps } from '../types';

function Player(props: PlayerIconsProps) {
    const { variant } = props;

    switch (variant) {
        case 'stop': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" baseProfile="tiny" version="1.2" viewBox="0 0 24 24" xmlSpace="preserve">
                    <path d="M16 6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                </svg>
            );
        }
        default:
            return null;
    }
}

export default Player;
