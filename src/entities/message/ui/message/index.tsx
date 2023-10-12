import React, { forwardRef, memo } from 'react';

import { chatTypes, useChatStore } from 'entities/chat';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Dropdown, Icons, Title, TitleTypes } from 'shared/ui';

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
import { useDimensionsObserver, useEasyState, useStyles } from '../../../../shared/hooks';
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

    const avatarSize = useEasyState(52);
    const nameTitleVariant = useEasyState<TitleTypes.TitleVariants>('H3S');
    const dateTitleVariant = useEasyState<TitleTypes.TitleVariants>('H4M');
    const replyAndForwardTitleVariant = useEasyState<TitleTypes.TitleVariants>('H4S');
    const messageWrapperWidth = useEasyState(0);

    const classes = useStyles(styles, 'bubble', {
        isMy,
        my_last: lastMessageInBlock && isMy,
        another_last: lastMessageInBlock && !isMy,
    });

    useDimensionsObserver({
        refs: { wrapper: ref },
        onResize: {
            wrapper: (size) => {
                const bp = size.width < 450;
                avatarSize.set(bp ? 40 : 52);
                nameTitleVariant.set(bp ? 'H4S' : 'H3S');
                dateTitleVariant.set(bp ? 'caption1M' : 'H4M');
                replyAndForwardTitleVariant.set(bp ? 'caption1S' : 'H4S');
                messageWrapperWidth.set(size.width);
            },
        },
    });

    return (
        <Box className={styles.wrapper}>
            {!isMy && chat?.is_group && <Avatar opacity={lastMessageInBlock ? 1 : 0} size={avatarSize.value} img={authorAvatar} />}
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
                                    <Title variant={nameTitleVariant.value}>{authorName}</Title>
                                </div>
                            )}
                            {reply_to_message?.id && (
                                <ReplyMessage
                                    messageWrapperWidth={messageWrapperWidth.value}
                                    nameTitleVariant={replyAndForwardTitleVariant.value}
                                    message={messageProxy({ message: reply_to_message })}
                                />
                            )}
                            {forwarded_from_message?.id && (
                                <ForwardMessage
                                    nameTitleVariant={replyAndForwardTitleVariant.value}
                                    message={messageProxy({ message: forwarded_from_message })}
                                />
                            )}
                            {((type === 'text' && !forwarded_from_message) || forwarded_from_message?.type === 'text') && (
                                <TextMessage text={forwarded_from_message?.text || text} openChatProfileModal={openChatProfileModal} chat={chat} />
                            )}
                            {(type === 'images' || forwarded_from_message?.type === 'images') && (
                                <ImagesMessage images={forwarded_from_message?.files || files} />
                            )}
                            {(type === 'documents' || forwarded_from_message?.type === 'documents') && (
                                <DocumentsMessage documents={forwarded_from_message?.files || files} />
                            )}
                            {(type === 'voices' || forwarded_from_message?.type === 'voices') && (
                                <VoiceMessage voices={forwarded_from_message?.files || message.files} />
                            )}
                            {(type === 'audios' || forwarded_from_message?.type === 'audios') && (
                                <AudioMessage audios={forwarded_from_message?.files || message.files} />
                            )}
                            {(type === 'videos' || forwarded_from_message?.type === 'videos') && (
                                <VideoMessage videos={forwarded_from_message?.files || message.files} />
                            )}
                        </div>
                        <div className={styles.info}>
                            {message.is_edited && (
                                <div className={styles.edited}>
                                    <Title variant="Body14">Изменено</Title>
                                </div>
                            )}
                            <Title primary={false} variant={dateTitleVariant.value}>
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
