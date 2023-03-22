import React from 'react';

import { ChatsList } from 'features/chat';
import { SearchChats } from 'features/search';

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
