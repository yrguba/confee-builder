import React from 'react';
import ReactDOM from 'react-dom';

import { Meet } from 'features/meet';

import styles from './styles.module.scss';

function Room() {
    const calls_root = document.querySelector('#calls-root');

    return (
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <Meet />
        </div>
    );
}

export default Room;
