import { delay } from 'framer-motion';
import React from 'react';

import { ChatHeader } from 'features/chat';
import { MessagesList, MessageInput } from 'features/message';
import { useRouter } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Chat() {
    const { params } = useRouter();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <ChatHeader />
            </div>
            <Box.Animated key={params.chat_id} visible animate={{ opacity: 1, transition: { delay: 0.2 } }} className={styles.messageList}>
                <MessagesList />
            </Box.Animated>
            <div className={styles.input}>
                <MessageInput />
            </div>
        </div>
    );
}

export default Chat;
