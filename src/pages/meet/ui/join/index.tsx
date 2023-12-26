import React from 'react';
import ReactDOM from 'react-dom';

import { JoinMeet } from 'features/meet';

import styles from './styles.module.scss';

function Join() {
    return (
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <JoinMeet />
        </div>
    );
}

export default Join;
