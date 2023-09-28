import React, { forwardRef, memo } from 'react';

import { chatTypes, useChatStore } from 'entities/chat';
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
import { EmployeeProxy } from '../../../company/model/types';
import { userProxy } from '../../../user';
import { User, UserProxy } from '../../../user/model/types';
import messageProxy from '../../lib/proxy';
import { MessageProxy, MessageMenuActions } from '../../model/types';

type Props = {
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    sendReaction: (emoji: string, messageId: number) => void;
    openChatProfileModal: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    voiceRecordingInProgress: boolean;
} & BaseTypes.Statuses;

const Message = forwardRef<HTMLDivElement, Props>((props, ref: any) => {
    const { message, messageMenuAction, chat, sendReaction, openChatProfileModal, voiceRecordingInProgress } = props;

    const {
        text,
        files,
        type,
        reply_to_message,
        lastMessageInBlock,
        isMy,
        isMock,
        author,
        forwarded_from_message,
        firstMessageInBlock,
        authorName,
        authorAvatar,
    } = message;

    const classes = useStyles(styles, 'bubble', {
        isMy,
        my_last: lastMessageInBlock && isMy,
        another_last: lastMessageInBlock && !isMy,
    });

    return (
        <Box className={styles.wrapper}>
            {!isMy && chat?.is_group && <Avatar opacity={lastMessageInBlock ? 1 : 0} size={52} img={authorAvatar} />}
            <Dropdown.Dynamic
                disabled={voiceRecordingInProgress}
                reverseX={message.isMy}
                ref={ref}
                trigger="right-click"
                closeAfterClick
                content={
                    <MessageMenu
                        openChatProfileModal={openChatProfileModal}
                        sendReaction={sendReaction}
                        chat={chat}
                        messageMenuAction={messageMenuAction}
                        message={message}
                    />
                }
            >
                <div className={styles.content}>
                    <div className={classes}>
                        <div className={styles.body}>
                            {!isMy && chat?.is_group && firstMessageInBlock && (
                                <div className={styles.authorName}>
                                    <Title variant="H3S">{authorName}</Title>
                                </div>
                            )}
                            {reply_to_message?.id && <ReplyMessage message={reply_to_message} />}
                            {forwarded_from_message?.id && <ForwardMessage message={messageProxy({ message: forwarded_from_message })} />}
                            {type === 'text' && <TextMessage text={text} openChatProfileModal={openChatProfileModal} chat={chat} />}
                            {type === 'images' && <ImagesMessage images={files} />}
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
    if (prevProps.message?.text !== nextProps.message?.text) return false;
    if (prevProps.message?.isMock !== nextProps.message?.isMock) return false;
    if (prevProps.message?.reply_to_message !== nextProps.message?.reply_to_message) return false;
    if (prevProps.message?.is_edited !== nextProps.message?.is_edited) return false;
    if (prevProps.message?.reactions !== nextProps.message?.reactions) return false;
    if (prevProps.message?.lastMessageInBlock !== nextProps.message?.lastMessageInBlock) return false;
    if (prevProps.message?.users_have_read !== nextProps.message?.users_have_read) return false;
    if (prevProps.message?.isFirstUnread !== nextProps.message?.isFirstUnread) return false;
    if (prevProps.message?.forwarded_from_message !== nextProps.message?.forwarded_from_message) return false;
    return true;
});
