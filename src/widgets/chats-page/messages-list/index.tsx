import React from 'react';

import { MessagesList } from 'features/message';

import styles from './styles.module.scss';

function MessagesListChatsPage() {
    console.log('u');
    return (
        <div className={styles.header}>
            <div className={styles.tabs}>
                <MessagesList />
            </div>
        </div>
    );
}

export default MessagesListChatsPage;
