import React from 'react';

import { MessagesList } from 'features/message';

import styles from './styles.module.scss';

function MessagesListChatsPage() {
    return (
        <div className={styles.wrapper}>
            <MessagesList />
        </div>
    );
}

export default MessagesListChatsPage;
