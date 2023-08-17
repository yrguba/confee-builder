import React, { useCallback } from 'react';

import { UseEasyStateReturnedType, UseStore } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons, Title, Button, AudioPlayer, IconsTypes } from 'shared/ui';

import styles from './styles.module.scss';
import VoiceButton from './widgets/voice-button';
import { ChatProxy } from '../../../chat/model/types';
import { MessageProxy, VoiceEvents } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    messageTextState: UseEasyStateReturnedType<string>;
    sendMessage: () => void;
    clickUploadFiles: () => void;
    replyMessage: UseStore.SelectorWithObj<MessageProxy | null>;
    editMessage: UseStore.SelectorWithObj<MessageProxy | null>;
    forwardMessage: UseStore.SelectorWithObj<{ fromChatName: string; message: MessageProxy | null } | null>;
    highlightedMessages: UseStore.SelectorWithArr<MessageProxy>;
    getVoiceEvents: (e: VoiceEvents) => void;
    showVoice: boolean;
    deleteVoice: () => void;
    voiceRecord: {
        recorderState: {
            audio: string;
            recordingMinutes: 0;
            recordingSeconds: 5;
            initRecording: boolean;
        };
    };
} & BaseTypes.Statuses;

function MessageInputView(props: Props) {
    const {
        chat,
        messageTextState,
        sendMessage,
        clickUploadFiles,
        replyMessage,
        editMessage,
        getVoiceEvents,
        voiceRecord,
        showVoice,
        deleteVoice,
        highlightedMessages,
        forwardMessage,
    } = props;

    const { audio, initRecording, recordingSeconds, recordingMinutes } = voiceRecord.recorderState;

    const getHeaderTitle = () => {
        if (replyMessage.value) return replyMessage.value?.authorName;
        if (editMessage.value) return 'Редактировать';
        if (forwardMessage?.value?.fromChatName) return forwardMessage.value.fromChatName;
    };

    const getHeaderIcon = (): IconsTypes.BaseIconsVariants => {
        if (replyMessage.value) return 'reply-black';
        if (editMessage.value) return 'edit';
        return 'forward-black';
    };

    const getHeaderSubtitle = () => {
        if (replyMessage.value) return replyMessage.value?.text;
        if (editMessage.value) return editMessage.value?.text;
        if (forwardMessage?.value?.message) return forwardMessage?.value?.message.text;
    };

    const closeHeader = () => {
        if (replyMessage.value) replyMessage.set(null);
        if (editMessage.value) editMessage.set(null);
        if (forwardMessage?.value?.fromChatName) forwardMessage.set(null);
        messageTextState.set('');
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                messageTextState.set((prev) => `${prev}\n`);
            } else {
                sendMessage();
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <Box.Animated
                visible={!!replyMessage.value || !!editMessage.value || !!forwardMessage?.value?.fromChatName}
                className={styles.header}
                animationVariant="autoHeight"
            >
                <div className={styles.icon}>
                    <Icons variant={getHeaderIcon()} />
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
                <Box.Animated visible key={`${initRecording}X${showVoice}`} className={styles.input}>
                    {initRecording ? (
                        <div className={styles.timerRecording}>
                            <div className={styles.indicator} />
                            <div className={styles.timer}>
                                <span>{recordingMinutes ? (recordingMinutes < 10 ? `0${recordingMinutes}` : recordingMinutes) : '00'}</span>:
                                <span>{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
                            </div>
                        </div>
                    ) : showVoice ? (
                        <div className={styles.voicePreview}>
                            <div className={styles.deleteIcon} onClick={deleteVoice}>
                                <Icons variant="delete" />
                            </div>
                            <AudioPlayer.Voice size={400} url={audio} />
                        </div>
                    ) : (
                        <Input.Textarea
                            focusTrigger={replyMessage.value || editMessage.value || chat?.id}
                            focus
                            value={messageTextState.value}
                            onChange={(e) => messageTextState.set(e.target.value)}
                            onKeyDown={onKeyDown}
                        />
                    )}
                </Box.Animated>
                <div className={styles.openEmoji}>
                    <Emoji clickOnEmoji={(emoji) => messageTextState.set((prev) => prev + emoji)} />
                </div>
                <Box.Animated visible key={`${showVoice}w`} className={styles.sendBtn}>
                    {messageTextState.value || showVoice ? (
                        <Button.Circle radius={30} variant="secondary" onClick={sendMessage}>
                            <Icons variant="send" />
                        </Button.Circle>
                    ) : (
                        <VoiceButton initRecord={initRecording} getEvents={getVoiceEvents} />
                    )}
                </Box.Animated>
            </div>
        </div>
    );
}

export default MessageInputView;
