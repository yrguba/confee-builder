import React from 'react';

import { ChatsList, SearchChats } from 'features/chat';

import styles from './styles.module.scss';

function LeftSidebarChatsPage() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.search}>
                <SearchChats />
            </div>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default LeftSidebarChatsPage;
