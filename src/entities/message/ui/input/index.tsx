import React from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, UseEasyStateReturnType, UseStoreTypes } from 'shared/hooks';
import { getEnding, getUniqueArr } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons, Title, Button, AudioPlayer, IconsTypes } from 'shared/ui';

import styles from './styles.module.scss';
import VoiceButton from './widgets/voice-button';
import { ChatProxy } from '../../../chat/model/types';
import { MessageProxy, VoiceEvents } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    messageTextState: UseEasyStateReturnType<string>;
    sendMessage: () => void;
    clickUploadFiles: () => void;
    replyMessage: UseStoreTypes.SelectorWithObj<MessageProxy>;
    editMessage: UseStoreTypes.SelectorWithObj<MessageProxy>;
    forwardMessages: UseStoreTypes.SelectorWithObj<{ fromChatName: string; toChatId: number | null; messages: MessageProxy[]; redirect: boolean }>;
    highlightedMessages: UseStoreTypes.SelectorWithArr<MessageProxy>;
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
        forwardMessages,
    } = props;

    const { audio, initRecording, recordingSeconds, recordingMinutes } = voiceRecord.recorderState;

    const icon = useEasyState<'arrow' | 'audio' | 'video'>('audio');

    const getHeaderTitle = () => {
        if (replyMessage.value.id) return replyMessage.value?.authorName;
        if (editMessage.value.id) return 'Редактировать';
        if (forwardMessages?.value?.messages?.length) {
            const { messages } = forwardMessages.value;
            const uniqueUsers = getUniqueArr(messages, 'authorName');
            if (uniqueUsers.length === 1) return uniqueUsers[0].authorName;
            if (uniqueUsers.length === 2) return `${uniqueUsers[0].authorName} и ${uniqueUsers[1].authorName}`;
            if (uniqueUsers.length > 3) return `${uniqueUsers[0].authorName}, ${uniqueUsers[1].authorName} и ${messages.length - 2} других`;
        }
    };

    const getHeaderIcon = (): IconsTypes.BaseIconsVariants => {
        if (replyMessage.value.id) return 'reply-black';
        if (editMessage.value.id) return 'edit';
        return 'forward-black';
    };

    const getHeaderSubtitle = () => {
        if (replyMessage.value.id) return replyMessage.value?.text;
        if (editMessage.value.id) return editMessage.value?.text;
        if (forwardMessages?.value?.messages?.length) {
            const length = forwardMessages?.value?.messages?.length;
            if (length > 1) {
                return `${length} ${getEnding(length, ['сообщение', 'сообщения', 'сообщений'])}`;
            }
            return forwardMessages?.value?.messages[0].text;
        }
    };

    const closeHeader = () => {
        if (replyMessage.value.id) replyMessage.clear();
        if (editMessage.value.id) editMessage.clear();
        if (forwardMessages?.value?.fromChatName) forwardMessages.clear();
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

    useUpdateEffect(() => {
        if (!!messageTextState.value || showVoice || forwardMessages?.value?.redirect) return icon.set('arrow');
        return icon.set('audio');
    }, [messageTextState.value, forwardMessages?.value?.redirect, showVoice]);

    return (
        <div className={styles.wrapper} style={{ pointerEvents: highlightedMessages.value.length ? 'none' : 'auto' }}>
            <Box.Animated
                visible={!!replyMessage.value.id || !!editMessage.value.id || forwardMessages?.value?.redirect}
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
                <Box.Animated animationVariant="autoWidth" visible={!initRecording && !audio} className={styles.openDownloads} onClick={clickUploadFiles}>
                    <Icons variant="attach-file" />
                </Box.Animated>
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
                            <AudioPlayer size={400} url={audio} />
                        </div>
                    ) : (
                        <Input.Textarea
                            placeholder="Написать сообщение..."
                            focusTrigger={replyMessage.value.id || editMessage.value.id || chat?.id}
                            focus
                            value={messageTextState.value}
                            onChange={(e) => messageTextState.set(e.target.value)}
                            onKeyDown={onKeyDown}
                        />
                    )}
                </Box.Animated>
                <Box.Animated visible={!initRecording && !audio} className={styles.openEmoji}>
                    <Emoji clickOnEmoji={(emoji) => messageTextState.set((prev) => prev + emoji)} />
                </Box.Animated>
                <Box.Replace
                    className={styles.sendBtn}
                    items={[
                        {
                            visible: icon.value === 'arrow',
                            item: (
                                <Button.Circle radius={30} variant="secondary" onClick={sendMessage}>
                                    <Icons variant="send" />
                                </Button.Circle>
                            ),
                        },
                        {
                            visible: icon.value === 'audio',
                            item: <VoiceButton onClick={() => icon.set('video')} initRecord={initRecording} getEvents={getVoiceEvents} />,
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default MessageInputView;
