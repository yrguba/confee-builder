import React, { forwardRef } from 'react';

import { chatTypes } from 'entities/chat';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Dropdown, Icons, Title } from 'shared/ui';

import MessageMenu from './menu';
import styles from './styles.module.scss';
import DocumentsMessage from './variants/documents';
import ImagesMessage from './variants/images';
import ReplyMessage from './variants/reply';
import TextMessage from './variants/text';
import { useStyles } from '../../../../shared/hooks';
import { appTypes } from '../../../app';
import { MessageProxy, MessageMenuActions } from '../../model/types';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    sendReaction: (emoji: string, messageId: number) => void;
    clickImage: (data: appTypes.ImagesSwiperProps) => void;
} & BaseTypes.Statuses;

const Message = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { message, messageMenuAction, chat, sendReaction, clickImage } = props;

    const { text, files, type, reply_to_message, lastMessageInBlock, isMy, isMock, author } = message;

    const classes = useStyles(styles, 'bubble', {
        isMy,
        my_last: lastMessageInBlock && isMy,
        another_last: lastMessageInBlock && !isMy,
    });
    return (
        <Box className={styles.wrapper}>
            {!isMy && chat?.is_group && <Avatar opacity={lastMessageInBlock ? 1 : 0} size={52} img={author?.avatar?.path} />}
            <Dropdown.Dynamic
                reverseX={message.isMy}
                ref={ref}
                trigger="right-click"
                closeAfterClick
                content={<MessageMenu sendReaction={sendReaction} chat={chat} messageMenuAction={messageMenuAction} message={message} />}
            >
                <div className={styles.content}>
                    <div className={classes}>
                        <div className={styles.body}>
                            {reply_to_message && <ReplyMessage message={reply_to_message} />}
                            {type === 'text' && <TextMessage text={text} />}
                            {type === 'images' && <ImagesMessage clickImage={clickImage} images={files} />}
                            {type === 'documents' && <DocumentsMessage documents={files} />}
                        </div>
                        <div className={styles.info}>
                            <Title primary={false} variant="H4M">
                                {message.date}
                            </Title>
                            <div className={styles.icon}>
                                <Box.Animated className={styles.checkIcon} visible={isMy && !isMock}>
                                    <Icons variant={message.users_have_read.length ? 'double-check' : 'check'} />
                                </Box.Animated>

                                <Box.Animated visible={isMock}>
                                    <Icons variant="clock" />
                                </Box.Animated>
                            </div>
                        </div>
                    </div>
                </div>
            </Dropdown.Dynamic>
        </Box>
    );
});

export default Message;
