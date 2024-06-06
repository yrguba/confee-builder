import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';

import { chatApi } from 'entities/chat';
import { ChatHeader, HighlightedMessages } from 'features/chat';
import { MessageInput } from 'features/message';
import { useRouter, useDimensionsObserver, useEasyState } from 'shared/hooks';
import { Audio, Box, AudioTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { messageStore } from '../../../../../entities/message';

function Chat() {
    const { params } = useRouter();

    const headerRef = useRef(null);
    const messagesListWidth = useEasyState(0);

    const audioType = Audio.store.use.type();
    const audioList = Audio.store.use?.list();

    const { data: files } = chatApi.handleGetChatFiles({ chatId: Number(params.chat_id), filesType: audioType.value as any });

    useUpdateEffect(() => {
        if (files?.length) {
            // const updFiles = files.map(
            //     (i): AudioTypes.AudioForPlayer => ({
            //         id: i.id,
            //         apiUrl: i.url,
            //         authorName: i.name,
            //         name: i.name,
            //     })
            // );
            // audioList?.addStart(files);
        }
    }, [files?.length]);

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
            <Audio.Player autoHeight width={messagesListWidth.value} />
            <HighlightedMessages />
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
