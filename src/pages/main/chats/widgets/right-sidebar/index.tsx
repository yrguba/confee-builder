import React from 'react';

import { ChatsList } from 'features/chat';

import styles from './styles.module.scss';

function RightSidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                RightSidebar
                {/* <ChatsList /> */}
            </div>
        </div>
    );
}

export default RightSidebar;
