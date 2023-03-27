import React from 'react';

import { ChatCard } from 'features/chat';

import styles from './styles.module.scss';

function HeaderChatsPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <ChatCard />
            </div>
        </div>
    );
}

export default HeaderChatsPage;
