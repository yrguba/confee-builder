import React, { useTransition } from 'react';

import { chatApi } from 'entities/chat';
import { useRouter, useStorage } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import { useMessageStore } from '../../../../../entities/message';

function AudioPlayer() {
    const { pathname, navigate, params } = useRouter();

    const messagesListWidth = useMessageStore.use.messagesListWidth();

    const getPosition = () => {
        if (params.chat_id) return { top: 71, width: messagesListWidth.value || 0 };
        return { bottom: 0 };
    };

    return (
        <>
            <div
                style={{
                    ...getPosition(),
                }}
                className={styles.wrapper}
            >
                <Audio.Player />
            </div>
        </>
    );
}

export default AudioPlayer;
//
