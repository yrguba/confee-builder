import React, { forwardRef, memo, ReactElement, ReactNode } from 'react';

import { chatTypes } from 'entities/chat';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Dropdown, Icons, Title, TitleTypes } from 'shared/ui';

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
import { employeeProxy } from '../../../company';
import { EmployeeProxy } from '../../../company/model/types';
import { userProxy } from '../../../user';
import { User, UserProxy } from '../../../user/model/types';
import messageProxy from '../../lib/proxy';
import { MessageStoreTypes } from '../../model/store';
import { MessageProxy, MessageMenuActions, File, MediaContentType } from '../../model/types';

type Props = {
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
    message: MessageProxy;
    MessageMenu: (props: { message: MessageProxy }) => ReactElement;
    openChatProfileModal: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    voiceRecordingInProgress: boolean;
    clickMessageReply: (message: MessageProxy) => void;
    menuMessageId: MessageStoreTypes['menuMessageId'];
    clearDownloadFile: () => void;
    active: boolean;
} & BaseTypes.Statuses;

const MessageView = forwardRef<HTMLDivElement, Props>((props, ref: any) => {
    const { active, clearDownloadFile, menuMessageId, clickMessageReply, message, MessageMenu, chat, openChatProfileModal, voiceRecordingInProgress } = props;

    const {
        text,
        files,
        type,
        reply_to_message,
        lastMessageInBlock,
        isMy,
        isMock,
        author,
        author_employee,
        forwarded_from_message,
        firstMessageInBlock,
        authorName,
        authorAvatar,
        sending,
        sendingError,
    } = message;

    const avatarSize = useEasyState(52);
    const nameTitleVariant = useEasyState<TitleTypes.TitleVariants>('H3S');
    const dateTitleVariant = useEasyState<TitleTypes.TitleVariants>('H4M');
    const replyAndForwardTitleVariant = useEasyState<TitleTypes.TitleVariants>('H4S');
    const messageWrapperWidth = useEasyState(0);

    const classes = useStyles(styles, 'bubble', {
        active,
        isMy,
        another: !isMy,
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

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        if (menuMessageId.value) {
            menuMessageId.clear();
        } else {
            menuMessageId.set(message.id);
        }
    };

    const openProfile = () => {
        openChatProfileModal({
            user: chat?.is_personal ? userProxy(author) || undefined : undefined,
            employee: chat?.is_personal ? null : employeeProxy(author_employee),
        });
    };

    return (
        <Box className={styles.wrapper} onContextMenu={clickContextMenu}>
            {!isMy && chat?.is_group ? (
                <div className={styles.avatar} style={{ width: avatarSize.value }}>
                    <div className={styles.img} onClick={openProfile}>
                        <Avatar name={message.authorName} opacity={lastMessageInBlock ? 1 : 0} size={avatarSize.value} img={authorAvatar} />
                    </div>
                </div>
            ) : null}
            <Dropdown
                destroyed
                visible={menuMessageId.value === message.id}
                reverseX={isMy}
                disabled={voiceRecordingInProgress}
                clickAway={menuMessageId.clear}
                // onClick={() => isVisibleMenu.set(false)}
                content={<MessageMenu message={message} />}
                openCloseTrigger={(value) => !value && clearDownloadFile()}
            />

            <div className={styles.content}>
                {!isMy && chat?.is_group && firstMessageInBlock && (
                    <div className={styles.authorName} onClick={openProfile}>
                        <Title active variant={nameTitleVariant.value}>
                            {authorName}
                        </Title>
                    </div>
                )}
                <div className={classes}>
                    {reply_to_message?.id && (
                        <ReplyMessage
                            chat={chat}
                            openChatProfileModal={openChatProfileModal}
                            clickMessageReply={clickMessageReply}
                            messageWrapperWidth={messageWrapperWidth.value}
                            nameTitleVariant={replyAndForwardTitleVariant.value}
                            message={messageProxy({ message })}
                        />
                    )}
                    {forwarded_from_message?.id && (
                        <ForwardMessage
                            chat={chat}
                            openChatProfileModal={openChatProfileModal}
                            nameTitleVariant={replyAndForwardTitleVariant.value}
                            message={messageProxy({ message })}
                        />
                    )}
                    {type === 'text' && !forwarded_from_message?.id && !reply_to_message?.id && (
                        <TextMessage message={message} openChatProfileModal={openChatProfileModal} chat={chat} />
                    )}
                    {type === 'images' && !forwarded_from_message?.id && !reply_to_message?.id && <ImagesMessage message={message} />}
                    {type === 'documents' && !forwarded_from_message?.id && !reply_to_message?.id && <DocumentsMessage message={message} />}
                    {type === 'voices' && !forwarded_from_message?.id && !reply_to_message?.id && <VoiceMessage message={message} chat={chat} />}
                    {type === 'audios' && !forwarded_from_message?.id && !reply_to_message?.id && <AudioMessage message={message} chat={chat} />}
                    {type === 'videos' && !forwarded_from_message?.id && !reply_to_message?.id && <VideoMessage message={message} />}
                </div>
            </div>
        </Box>
    );
});

export default memo(MessageView, (prevProps, nextProps): any => {
    if (prevProps.active !== nextProps.active) return false;
    if (prevProps.menuMessageId !== nextProps.menuMessageId) return false;
    if (prevProps.message?.text !== nextProps.message?.text) return false;
    if (prevProps.message?.sending !== nextProps.message?.sending) return false;
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
