import React from 'react';

import { MessageInput } from 'features/message';

import styles from './styles.module.scss';

function MessageInputForChatsPage() {
    return (
        <div className={styles.wrapper}>
            <MessageInput />
        </div>
    );
}

export default MessageInputForChatsPage;
