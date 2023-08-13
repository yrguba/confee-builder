import React from 'react';

import { UseEasyStateReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../chat/model/types';
import { MessageProxy } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    onKeyDown: (arg: any) => void;
    messageTextState: UseEasyStateReturnedType<string>;
    btnClick: (arg?: any) => void;
    clickUploadFiles: () => void;
    replyMessage: BaseTypes.StoreSelectorType<MessageProxy | null>;
    editMessage: BaseTypes.StoreSelectorType<MessageProxy | null>;
} & BaseTypes.Statuses;

function MessageInputView(props: Props) {
    const { chat, messageTextState, onKeyDown, btnClick, clickUploadFiles, replyMessage, editMessage } = props;

    const getHeaderTitle = () => {
        if (replyMessage.value) return replyMessage.value?.authorName;
        if (editMessage.value) return 'Редактировать';
    };

    const getHeaderSubtitle = () => {
        if (replyMessage.value) return replyMessage.value?.text;
        if (editMessage.value) return editMessage.value?.text;
    };

    const closeHeader = () => {
        if (replyMessage.value) replyMessage.set(null);
        if (editMessage.value) editMessage.set(null);
        messageTextState.set('');
    };

    return (
        <div className={styles.wrapper}>
            <Box.Animated visible={!!replyMessage.value || !!editMessage.value} className={styles.header} animationVariant="autoHeight">
                <div className={styles.icon}>
                    <Icons variant={replyMessage.value ? 'reply-black' : 'edit'} />
                </div>
                <div className={styles.description}>
                    <Title active variant="H4S">
                        {getHeaderTitle()}
                    </Title>
                    <Title variant="H4M">{getHeaderSubtitle()}</Title>
                </div>
                <div className={styles.close} onClick={closeHeader}>
                    <Icons variant="close" />
                </div>
            </Box.Animated>
            <div className={styles.main}>
                <div className={styles.openDownloads} onClick={clickUploadFiles}>
                    <Icons variant="attach-file" />
                </div>
                <div className={styles.input}>
                    <Input.Textarea
                        focusTrigger={replyMessage.value || editMessage.value || chat?.id}
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
        </div>
    );
}

export default MessageInputView;
