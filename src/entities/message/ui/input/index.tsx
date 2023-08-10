import React from 'react';

import { UseEasyStateReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../chat/model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    onKeyDown: (arg: any) => void;
    messageTextState: UseEasyStateReturnedType<string>;
    btnClick: (arg?: any) => void;
    clickUploadFiles: () => void;
} & BaseTypes.Statuses;

function MessageInputView(props: Props) {
    const { chat, messageTextState, onKeyDown, btnClick, clickUploadFiles } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.openDownloads} onClick={clickUploadFiles}>
                <Icons variant="attach-file" />
            </div>
            <div className={styles.input}>
                <Input.Textarea
                    id={String(chat?.id)}
                    focus
                    value={messageTextState.value}
                    onChange={(e) => messageTextState.set(e.target.value)}
                    onKeyDown={onKeyDown}
                />
            </div>
            <div className={styles.openEmoji}>
                <Emoji clickOnEmoji={(emoji) => messageTextState.set((prev) => prev + emoji)} />
            </div>
            <Box.Animated animationVariant="autoWidth" visible={!!messageTextState.value} className={styles.sendBtn} onClick={btnClick}>
                <Icons variant="send" />
            </Box.Animated>
        </div>
    );
}

export default MessageInputView;
