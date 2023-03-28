import React from 'react';

import { MessageInput } from 'features/message';

import styles from './styles.module.scss';

function MessageInputChatsPage() {
    return (
        <div className={styles.wrapper}>
            <MessageInput />
        </div>
    );
}

export default MessageInputChatsPage;
