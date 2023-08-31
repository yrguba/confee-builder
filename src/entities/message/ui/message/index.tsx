import React, { forwardRef, memo } from 'react';

import { chatTypes } from 'entities/chat';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Dropdown, Icons, Title } from 'shared/ui';

import MessageMenu from './menu';
import styles from './styles.module.scss';
import AudioMessage from './variants/audio';
import DocumentsMessage from './variants/documents';
import ForwardMessage from './variants/forward';
import ImagesMessage from './variants/images';
import ReplyMessage from './variants/reply';
import TextMessage from './variants/text';
import VideoMessage from './variants/video';
import VoiceMessage from './variants/voice';
import { useStyles } from '../../../../shared/hooks';
import { appTypes } from '../../../app';
import messageProxy from '../../lib/proxy';
import { MessageProxy, MessageMenuActions } from '../../model/types';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    sendReaction: (emoji: string, messageId: number) => void;
    clickImage: (data: appTypes.ImagesSwiperProps) => void;
    clickTag: (tag: string) => void;
    voiceRecordingInProgress: boolean;
} & BaseTypes.Statuses;

const Message = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { message, messageMenuAction, chat, sendReaction, clickImage, clickTag, voiceRecordingInProgress } = props;

    const { text, files, type, reply_to_message, lastMessageInBlock, isMy, isMock, author, forwarded_from_message } = message;

    const classes = useStyles(styles, 'bubble', {
        isMy,
        my_last: lastMessageInBlock && isMy,
        another_last: lastMessageInBlock && !isMy,
    });

    return (
        <Box className={styles.wrapper}>
            {!isMy && chat?.is_group && <Avatar opacity={lastMessageInBlock ? 1 : 0} size={52} img={author?.avatar} />}
            <Dropdown.Dynamic
                disabled={voiceRecordingInProgress}
                reverseX={message.isMy}
                ref={ref}
                trigger="right-click"
                closeAfterClick
                content={<MessageMenu sendReaction={sendReaction} chat={chat} messageMenuAction={messageMenuAction} message={message} />}
            >
                <div className={styles.content}>
                    <div className={classes}>
                        <div className={styles.body}>
                            {reply_to_message?.id && <ReplyMessage message={reply_to_message} />}
                            {forwarded_from_message?.id && <ForwardMessage message={messageProxy({ message: forwarded_from_message })} />}
                            {type === 'text' && <TextMessage text={text} clickTag={clickTag} />}
                            {type === 'images' && <ImagesMessage clickImage={clickImage} images={files} />}
                            {type === 'documents' && <DocumentsMessage documents={files} />}
                            {type === 'voices' && <VoiceMessage voices={message.files} />}
                            {type === 'audios' && <AudioMessage audios={message.files} />}
                            {type === 'videos' && <VideoMessage videos={message.files} />}
                        </div>
                        <div className={styles.info}>
                            {message.is_edited && (
                                <div className={styles.edited}>
                                    <Title variant="Body14">Изменено</Title>
                                </div>
                            )}
                            <Title primary={false} variant="H4M">
                                {message.date}
                            </Title>
                            <Box.Replace
                                className={styles.icon}
                                items={[
                                    {
                                        visible: isMy && !isMock,
                                        item: (
                                            <div className={styles.checkIcon}>
                                                <Icons variant={message.users_have_read.length ? 'double-check' : 'check'} />
                                            </div>
                                        ),
                                    },
                                    {
                                        visible: isMock,
                                        item: <Icons variant="clock" />,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Dropdown.Dynamic>
        </Box>
    );
});

export default memo(Message, (prevProps, nextProps): any => {
    if (prevProps.message?.text !== nextProps.message?.text) return false;
    return true;
});
