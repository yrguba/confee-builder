import React from 'react';

import { ChatsList, SearchChats } from 'features/chat';

import styles from './styles.module.scss';

function RightSidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <SearchChats />
            </div>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default RightSidebar;
