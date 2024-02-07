import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useMessageStore } from 'entities/message';
import { ChatHeader } from 'features/chat';
import { MessageInput } from 'features/message';
import { useRouter, useDimensionsObserver } from 'shared/hooks';
import { Audio, Box } from 'shared/ui';

import styles from './styles.module.scss';

function Chat() {
    const { params } = useRouter();

    const messagesListWidth = useMessageStore.use.messagesListWidth();
    const headerRef = useRef(null);

    useDimensionsObserver({
        refs: { wrapper: headerRef },
        onResize: {
            wrapper: (size) => {
                messagesListWidth.set(size.width);
            },
        },
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header} ref={headerRef}>
                <ChatHeader />
            </div>
            <Audio.Player autoHeight />
            <Box.Animated key={params.chat_id} visible animate={{ opacity: 1, transition: { delay: 0.15 } }} className={styles.messageList}>
                <Outlet />
            </Box.Animated>
            <div className={styles.input}>
                <MessageInput />
            </div>
        </div>
    );
}

export default Chat;
