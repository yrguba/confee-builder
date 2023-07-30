import React from 'react';

import { ChatHeader } from 'features/chat';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Chat() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.header}>
                <ChatHeader />
            </div>
            <div className={styles.messageList}>{/* <MessagesList /> */}</div>
            <div className={styles.input}>{/* <MessageInput /> */}</div>
        </Box.Animated>
    );
}

export default Chat;
