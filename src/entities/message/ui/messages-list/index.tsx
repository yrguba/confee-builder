import React, { useRef, UIEvent, Fragment, useEffect, RefObject, useState, useMemo, useCallback } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useScroll, useSize, useStyles, useInView, useScrollTo, useReverseTimer } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Dropdown } from 'shared/ui';
import { BaseInputProps } from 'shared/ui/input/types';

import styles from './styles.module.scss';
import pages from '../../../../pages';
import { ChatTypes } from '../../../chat';
import { Message, MessageMenuItem, MessageProxy } from '../../model/types';
import MessageMenuView from '../menu';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';

type Props = {
    chat: ChatTypes.Chat | BaseTypes.Empty;
    messages: MessageProxy[] | BaseTypes.Empty;
    getPrevPage: () => void;
    getNextPage: () => void;
    readMessage: (messageId: number) => void;
    textMessageMenuItems: MessageMenuItem[];
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, readMessage, getPrevPage, getNextPage, textMessageMenuItems, reactionClick } = props;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    const { ref: prevPageRef, inView: inViewPrevPage } = useInView({ delay: 200 });
    const { ref: nextPageRef, inView: inViewNextPage } = useInView({ delay: 200 });
    const { ref: firstPendingMessagesRef, inView: inViewFirsPendingMessage } = useInView();

    const getMessageRef = (message: MessageProxy, index: number) => {
        if (!chat?.pending_messages) {
            if (messages?.length === index + 1) return messageRef;
        } else if (message.isFirstUnread) {
            return mergeRefs([messageRef, firstPendingMessagesRef]);
        }
        return null;
    };
    const [scrollIntoView, setScrollIntoView] = useState(true);

    useEffect(() => {
        inViewPrevPage && getPrevPage();
    }, [inViewPrevPage]);

    useEffect(() => {
        inViewNextPage && getNextPage();
    }, [inViewNextPage]);

    useEffect(() => {
        if (messageRef.current && scrollIntoView) {
            messageRef.current.scrollIntoView({ block: 'center' });
        }
    }, [messageRef.current]);

    useEffect(() => {
        if (inViewFirsPendingMessage && messages) {
            const id = messages.find((message: MessageProxy) => message.isFirstUnread)?.id || null;
            if (id) {
                setScrollIntoView(false);
                setTimeout(() => readMessage(id), 200);
            }
        }
    }, [inViewFirsPendingMessage, messageRef.current]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    {message.isMy && <div className={styles.c}>self</div>}
                    {index === 5 && (
                        <div ref={nextPageRef} className={styles.c}>
                            next
                        </div>
                    )}
                    {message.isFirstUnread && <div className={styles.c}>new message</div>}
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
