import React from 'react';

import { MessagesList } from 'features/message';

import styles from './styles.module.scss';

function MessagesListForChatsPage() {
    return (
        <div className={styles.wrapper}>
            <MessagesList />
        </div>
    );
}

export default MessagesListForChatsPage;
