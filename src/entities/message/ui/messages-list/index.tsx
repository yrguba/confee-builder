import React, { useRef, Fragment, useEffect, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useInView, usePrevious, useScroll, useElementDimensions } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { chatTypes } from '../../../chat';
import { MessageMenuActions, MessageProxy } from '../../model/types';
import Message from '../message';
import SystemMessage from '../message/variants/system';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    messages: MessageProxy[];
    getPrevPage: () => void;
    getNextPage: () => void;
    hoverMessage: (message: MessageProxy) => void;
    subscribeToChat: (action: 'sub' | 'unsub') => void;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, getPrevPage, getNextPage, hoverMessage, subscribeToChat, messageMenuAction } = props;

    const [initOnce, setInitOnce] = useState(true);

    const prevChat = usePrevious(chat);

    const { executeScrollToElement } = useScroll();
    const [wrapperSize, wrapperSizeRef] = useElementDimensions(true);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const firstUnreadMessageRef = useRef<HTMLDivElement>(null);

    const { ref: prevPageRef, inView: inViewPrevPage } = useInView({ delay: 200 });
    const { ref: nextPageRef, inView: inViewNextPage } = useInView({ delay: 200 });
    const { ref: lastMessageCheckVisibleRef, inView: inViewLastMessageCheckVisibleRef } = useInView({ delay: 200 });

    const getMessageRefs = (message: MessageProxy, index: number) => {
        if (!messages?.length) return null;
        const refs = [];
        if (message.isFirstUnread) refs.push(firstUnreadMessageRef);
        if (messages.length - 1 === index) refs.push(lastMessageRef);
        if (messages.length - 1 === index) refs.push(lastMessageCheckVisibleRef);
        return mergeRefs(refs);
    };

    useEffect(() => {
        if (wrapperRef?.current && chat) {
            executeScrollToElement({ ref: lastMessageRef, disabled: !!chat?.pending_messages_count });
            executeScrollToElement({ ref: firstUnreadMessageRef, disabled: !chat?.pending_messages_count || !initOnce });
            if (prevChat?.id !== chat.id) setInitOnce(true);
            setTimeout(() => setInitOnce(false), 1000);
        }
    }, [messages]);

    useEffect(() => {
        if (inViewPrevPage) getPrevPage();
        if (inViewNextPage) getNextPage();
    }, [inViewPrevPage, inViewNextPage]);

    useEffect(() => {
        subscribeToChat(inViewLastMessageCheckVisibleRef && !chat?.pending_messages_count ? 'sub' : 'unsub');
    }, [inViewLastMessageCheckVisibleRef, chat?.pending_messages_count]);

    return (
        <div className={styles.wrapper} ref={mergeRefs([wrapperRef, wrapperSizeRef])}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    <SystemMessage text={message.systemMessageText} />
                    {message.type !== 'system' && (
                        <div
                            onMouseEnter={() => hoverMessage(message)}
                            className={styles.row}
                            style={{ justifyContent: message.isMy ? 'flex-end' : 'flex-start' }}
                            ref={getMessageRefs(message, index)}
                        >
                            {index === 5 && <div ref={nextPageRef} />}
                            <Message
                                ref={wrapperRef}
                                message={message}
                                lastFive={messages.length - 5 < index && messages.length > 6}
                                messageMenuAction={messageMenuAction}
                            />
                            {messages?.length - 5 === index && <div ref={prevPageRef} />}
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}

export default MessagesListView;
