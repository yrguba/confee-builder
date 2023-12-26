import React from 'react';
import ReactDOM from 'react-dom';

import { MeetRoom } from 'features/meet';

import styles from './styles.module.scss';

function Room() {
    const calls_root = document.querySelector('#calls-root');

    return (
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <MeetRoom />
        </div>
    );
}

export default Room;
