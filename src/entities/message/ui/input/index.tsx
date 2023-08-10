import React from 'react';

import { messageTypes } from 'entities/message';
import { UseEasyStateReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Input, Emoji, Dropdown, Icons } from 'shared/ui';

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
            <div className={styles.input}>
                <div className={styles.icon} onClick={clickUploadFiles}>
                    <Icons variant="attach-file" />
                </div>
                <div className={styles.textarea}>
                    <Input.Textarea
                        id={String(chat?.id)}
                        focus
                        value={messageTextState.value}
                        onChange={(e) => messageTextState.set(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className={styles.emoji}>
                    <Emoji clickOnEmoji={(emoji) => messageTextState.set((prev) => prev + emoji)} />
                </div>
            </div>
            <div className={styles.btnColumn}>
                <div className={styles.sendBtn}>
                    <Button.Circle active onClick={btnClick}>
                        <Icons variant="add" />
                    </Button.Circle>
                </div>
            </div>
        </div>
    );
}

export default MessageInputView;
