import React, { useRef, UIEvent, Fragment, useEffect, RefObject } from 'react';

import { useScroll, useSize, useStyles, useInView, useScrollTo } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Dropdown } from 'shared/ui';
import { BaseInputProps } from 'shared/ui/input/types';

import styles from './styles.module.scss';
import pages from '../../../../pages';
import { ChatTypes } from '../../../chat';
import { Massage, MessageMenuItem } from '../../model/types';
import MessageMenuView from '../menu';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';

type Props = {
    chat: ChatTypes.Chat | BaseTypes.Empty;
    messages: Massage[] | BaseTypes.Empty;
    getPrevPage: () => void;
    getNextPage: () => void;
    textMessageMenuItems: MessageMenuItem[];
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, getPrevPage, getNextPage, textMessageMenuItems, reactionClick } = props;
    console.log(messages);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const firstUnreadMessageRef = useRef<HTMLDivElement>(null);
    const { ref: prevPageRef, inView: inViewPrevPage } = useInView();
    const { ref: nextPageRef, inView: inViewNextPage } = useInView();

    useEffect(() => {
        setTimeout(() => inViewPrevPage && getPrevPage(), 200);
    }, [inViewPrevPage]);

    useEffect(() => {
        setTimeout(() => inViewNextPage && getNextPage(), 200);
    }, [inViewNextPage]);

    useEffect(() => {
        if (wrapperRef.current && !chat?.pending_messages) {
            wrapperRef.current.scroll(0, 0);
        }
        if (firstUnreadMessageRef.current) {
            firstUnreadMessageRef.current.style.backgroundColor = 'red';
            // firstUnreadMessageRef.current.scrollIntoView({ block: 'center' });
        }
    }, [firstUnreadMessageRef.current, messages]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    {index === 5 && (
                        <div ref={nextPageRef} className={styles.c}>
                            next
                        </div>
                    )}
                    <div className={styles.messageWrapper} ref={chat && chat?.totalMessages - chat?.pending_messages === index ? firstUnreadMessageRef : null}>
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
