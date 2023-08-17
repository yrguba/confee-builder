import React from 'react';

import { UseEasyStateReturnedType, UseStore } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons, Title, Button, AudioPlayer } from 'shared/ui';

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
    const { chat, messageTextState, sendMessage, clickUploadFiles, replyMessage, editMessage, getVoiceEvents, voiceRecord, showVoice, deleteVoice } = props;

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

    const recordMin = voiceRecord.recorderState.recordingMinutes;
    const recordSec = voiceRecord.recorderState.recordingSeconds;
    const initRecord = voiceRecord.recorderState.initRecording;
    const { audio } = voiceRecord.recorderState;
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
                <Box.Animated visible key={`${initRecord}X${showVoice}`} className={styles.input}>
                    {initRecord ? (
                        <div className={styles.timerRecording}>
                            <div className={styles.indicator} />
                            <div className={styles.timer}>
                                <span>{recordMin ? (recordMin < 10 ? `0${recordMin}` : recordMin) : '00'}</span>:
                                <span>{recordSec < 10 ? `0${recordSec}` : recordSec}</span>
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
                        <VoiceButton initRecord={initRecord} getEvents={getVoiceEvents} />
                    )}
                </Box.Animated>
            </div>
        </div>
    );
}

export default MessageInputView;
