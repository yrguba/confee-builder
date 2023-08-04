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
            efesfeswdawd
            <div className={styles.header}>
                <ChatHeader />
            </div>
            <Box.Animated key={params.chat_id} visible className={styles.messageList}>
                <MessagesList />
            </Box.Animated>
            <div className={styles.input}>
                <MessageInput />
            </div>
        </div>
    );
}

export default Chat;
