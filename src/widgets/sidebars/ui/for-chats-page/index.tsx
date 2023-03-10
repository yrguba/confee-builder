import React from 'react';

import { SearchChats } from 'features/search';

import styles from './styles.module.scss';

function SidebarForChatsPage() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.search}>
                <SearchChats />
            </div>
            <div className={styles.list}>dwa</div>
        </div>
    );
}

export default SidebarForChatsPage;
