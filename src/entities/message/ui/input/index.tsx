import React, { RefObject } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, UseEasyStateReturnType } from 'shared/hooks';
import { getEnding, getUniqueArr } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons, Title, Button, Audio, IconsTypes, Dropdown, Card } from 'shared/ui';

import styles from './styles.module.scss';
import SpeechButton from './widgets/speech-button';
import VideoButton from './widgets/video-button';
import VoiceButton from './widgets/voice-button';
import { ChatProxy } from '../../../chat/model/types';
import { Employee } from '../../../company/model/types';
import { User, UserProxy } from '../../../user/model/types';
import { MessageStoreTypes } from '../../model/store';
import { MessageProxy, VoiceEvents } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    messageTextState: UseEasyStateReturnType<string>;
    sendMessage: () => void;
    clickUploadFiles: () => void;
    replyMessage: MessageStoreTypes['replyMessage'];
    editMessage: MessageStoreTypes['editMessage'];
    forwardMessages: MessageStoreTypes['forwardMessages'];
    highlightedMessages: MessageStoreTypes['highlightedMessages'];
    getVoiceEvents: (e: VoiceEvents) => void;
    showVoice: boolean;
    deleteVoice: () => void;
    tagUsers: UseEasyStateReturnType<UserProxy[]>;
    dropContainerRef: RefObject<any>;
    isFileDrag: MessageStoreTypes['isFileDrag'];
    sendDraft: () => void;
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
        tagUsers,
        dropContainerRef,
        isFileDrag,
        sendDraft,
    } = props;

    const speechListener = useEasyState(false);

    const { audio, initRecording, recordingSeconds, recordingMinutes } = voiceRecord.recorderState;

    const icon = useEasyState<'arrow' | 'audio' | 'video' | 'keyboard'>('audio');

    const getHeaderTitle = () => {
        if (replyMessage.value?.id) return replyMessage.value?.authorName;
        if (editMessage.value?.id) return 'Редактировать';
        if (forwardMessages?.value?.messages?.length) {
            const { messages } = forwardMessages.value;
            const uniqueUsers = getUniqueArr(messages, 'authorName');
            if (uniqueUsers.length === 1) return uniqueUsers[0]?.authorName;
            if (uniqueUsers.length === 2) return `${uniqueUsers[0]?.authorName} и ${uniqueUsers[1]?.authorName}`;
            if (uniqueUsers.length > 3) return `${uniqueUsers[0]?.authorName}, ${uniqueUsers[1]?.authorName} и ${messages.length - 2} других`;
        }
    };

    const getHeaderIcon = (): IconsTypes.BaseIconsVariants => {
        if (replyMessage.value?.id) return 'reply-black';
        if (editMessage.value?.id) return 'edit';
        return 'forward-black';
    };

    const getHeaderSubtitle = () => {
        if (replyMessage.value?.id) return replyMessage.value?.text;
        if (editMessage.value?.id) return editMessage.value?.text;
        if (forwardMessages?.value?.messages?.length) {
            const length = forwardMessages?.value?.messages?.length;
            if (length > 1) {
                return `${length} ${getEnding(length, ['сообщение', 'сообщения', 'сообщений'])}`;
            }
            return forwardMessages?.value?.messages[0]?.text;
        }
    };

    const closeHeader = () => {
        if (replyMessage.value?.id) replyMessage.clear();
        if (editMessage.value?.id) editMessage.clear();
        if (forwardMessages?.value?.fromChatName) forwardMessages.clear();
        messageTextState.set('');
    };

    const clickUser = (user: UserProxy) => {
        messageTextState.set((prev) => `${prev.slice(0, -1)}@${user.nickname} `);
        tagUsers.set([]);
    };

    useUpdateEffect(() => {
        if ((!!messageTextState.value || showVoice || forwardMessages?.value?.redirect) && !speechListener.value) return icon.set('arrow');
        if (speechListener.value) return icon.set('keyboard');
        return icon.set('audio');
    }, [messageTextState.value, forwardMessages?.value?.redirect, showVoice, speechListener.value]);

    return (
        <div
            ref={dropContainerRef}
            className={styles.wrapper}
            style={{ pointerEvents: highlightedMessages.value?.length ? 'none' : 'auto' }}
            onDragOver={() => isFileDrag.set(true)}
            onDragLeave={() => isFileDrag.set(false)}
            onDrop={() => isFileDrag.set(false)}
            onMouseLeave={sendDraft}
        >
            <Box.Animated visible={!!tagUsers.value.length} className={styles.tagUsers}>
                {tagUsers.value.map((i) => (
                    <Card key={i.id} onClick={() => clickUser(i)} size="m" img={i.avatar} title={i.full_name} subtitle={`@${i.nickname}`} />
                ))}
            </Box.Animated>
            <Box.Animated
                visible={!!replyMessage.value?.id || !!editMessage.value?.id || !!forwardMessages?.value?.redirect}
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
                            <Audio.Voice url={audio} />
                        </div>
                    ) : (
                        <Input.Textarea
                            placeholder="Написать сообщение..."
                            focusTrigger={[tagUsers.value, replyMessage.value?.id, editMessage.value?.id, chat?.id]}
                            focus
                            value={messageTextState.value}
                            textChange={(text) => messageTextState.set(text)}
                            pressEnter={sendMessage}
                            // pressEnterAndCtrl={() => messageTextState.set((prev) => `${prev}\n`)}
                            lineBreak="enterAndCtrl"
                            visibleEmoji
                        />
                    )}
                </Box.Animated>
                {/* <Box.Animated visible={!initRecording && !audio} className={styles.openEmoji}> */}
                {/*    <Emoji clickOnEmoji={(emoji) => messageTextState.set((prev) => prev + emoji)} /> */}
                {/* </Box.Animated> */}
                <Box.Replace
                    className={styles.sendBtn}
                    transition={{ duration: 0.05 }}
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
                            item: <VoiceButton initRecord={initRecording} getEvents={getVoiceEvents} />,
                        },
                        {
                            visible: icon.value === 'video',
                            item: <VideoButton onClick={() => icon.set('audio')} />,
                        },
                        {
                            visible: icon.value === 'keyboard',
                            item: (
                                <SpeechButton
                                    send={sendMessage}
                                    speechListener={speechListener.set}
                                    getText={messageTextState.set}
                                    onClick={() => icon.set('audio')}
                                />
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default MessageInputView;
