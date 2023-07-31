import React, { useRef, Fragment, useEffect, useState } from 'react';

import { useInView, usePrevious, useScroll } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { chatTypes } from '../../../chat';
import { MessageProxy } from '../../model/types';
import Message from '../message';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    messages: MessageProxy[] | BaseTypes.Empty;
    getPrevPage: () => void;
    getNextPage: () => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, getPrevPage, getNextPage } = props;

    const { executeScrollToElement } = useScroll();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null);

    const { ref: prevPageRef, inView: inViewPrevPage } = useInView({ delay: 200 });
    const { ref: nextPageRef, inView: inViewNextPage } = useInView({ delay: 200 });

    useEffect(() => {
        if (wrapperRef?.current && chat) {
            executeScrollToElement({ ref: lastMessageRef, disabled: !!chat?.pending_messages_count });
        }
    }, [messages]);

    useEffect(() => {
        if (inViewPrevPage) return getPrevPage();
        if (inViewNextPage) return getNextPage();
    }, [inViewPrevPage, inViewNextPage]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div ref={nextPageRef} />
            {messages?.map((message, index) => (
                <div
                    key={message.id}
                    className={styles.row}
                    style={{ justifyContent: message.type === 'system' ? 'center' : message.isMy ? 'flex-end' : 'flex-start' }}
                    ref={messages?.length - 1 === index ? lastMessageRef : null}
                >
                    <Message message={message} />
                </div>
            ))}
            <div ref={prevPageRef} />
        </div>
    );
}

export default MessagesListView;
