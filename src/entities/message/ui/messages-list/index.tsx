import React, { useRef, UIEvent, Fragment, useEffect, RefObject, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useScroll, useSize, useStyles, useInView, useScrollTo } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Dropdown } from 'shared/ui';
import { BaseInputProps } from 'shared/ui/input/types';

import styles from './styles.module.scss';
import pages from '../../../../pages';
import { ChatTypes } from '../../../chat';
import { Message, MessageMenuItem } from '../../model/types';
import MessageMenuView from '../menu';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';

type Props = {
    chat: ChatTypes.Chat | BaseTypes.Empty;
    messages: Message[] | BaseTypes.Empty;
    firstPendingMessageId: number | undefined;
    getPrevPage: () => void;
    getNextPage: () => void;
    readMessage: (messageId: number) => void;
    textMessageMenuItems: MessageMenuItem[];
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, firstPendingMessageId, readMessage, getPrevPage, getNextPage, textMessageMenuItems, reactionClick } = props;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const { ref: prevPageRef, inView: inViewPrevPage } = useInView();
    const { ref: nextPageRef, inView: inViewNextPage } = useInView();
    const { ref: firstPendingMessagesRef, inView: inViewFirsPendingMessage } = useInView();
    console.log('firstPendingMessageId', firstPendingMessageId);
    useEffect(() => {
        setTimeout(() => inViewPrevPage && getPrevPage(), 200);
    }, [inViewPrevPage]);

    useEffect(() => {
        setTimeout(() => inViewNextPage && getNextPage(), 200);
    }, [inViewNextPage]);

    useEffect(() => {
        inViewFirsPendingMessage && firstPendingMessageId && readMessage(firstPendingMessageId);
    }, [inViewFirsPendingMessage, firstPendingMessageId]);

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.style.backgroundColor = 'red';
            messageRef.current.scrollIntoView({ block: 'center' });
        }
    }, [messageRef.current]);

    const getMessageRef = (message: Message, index: number) => {
        if (!chat?.pending_messages) {
            if (messages?.length === index + 1) return messageRef;
        } else if (firstPendingMessageId === message.id && message.message_status === 'pending') {
            return mergeRefs([messageRef, firstPendingMessagesRef]);
        }
        return null;
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    {index === 5 && (
                        <div ref={nextPageRef} className={styles.c}>
                            next
                        </div>
                    )}
                    {firstPendingMessageId && firstPendingMessageId === message.id && <div className={styles.c}>new message</div>}
                    <div className={styles.messageWrapper} ref={getMessageRef(message, index)}>
                        {message.message_type === 'system' ? (
                            <SystemMessageView text="rtwdawdwd" />
                        ) : (
                            <div className={styles.messageContent}>
                                <Dropdown
                                    trigger="right-click"
                                    position="right-center"
                                    content={<MessageMenuView reactionClick={(reaction) => reactionClick(message.id, reaction)} items={textMessageMenuItems} />}
                                >
                                    <TextMessageView message={message} reactionClick={reactionClick} />
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    {index + 5 === messages?.length && (
                        <div className={styles.c} ref={prevPageRef}>
                            prev
                        </div>
                    )}
                </Fragment>
            ))}
            <div className={styles.btnDown}>
                <Button.Circle active>{chat?.pending_messages}</Button.Circle>
            </div>
        </div>
    );
}

export default MessagesListView;
