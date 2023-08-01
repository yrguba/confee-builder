import React, { useRef, Fragment, useEffect, useState, UIEvent } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { storage } from 'entities/app';
import { useInView, usePrevious, useScroll, useTimeout } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { useDebounce } from '../../../../shared/hooks';
import { chatTypes } from '../../../chat';
import { MessageProxy } from '../../model/types';
import Message from '../message';
import SystemMessage from '../message/variants/system';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    messages: MessageProxy[];
    getPrevPage: () => void;
    getNextPage: () => void;
    hoverMessage: (message: MessageProxy) => void;
    subscribeToChat: (action: 'sub' | 'unsub') => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, getPrevPage, getNextPage, hoverMessage, subscribeToChat } = props;

    const [initOnce, setInitOnce] = useState(true);
    const [contextMenuPosition, setContextMenuPosition] = useState<number>(0);
    const prevChat = usePrevious(chat);

    const { executeScrollToElement, getScrollPosition } = useScroll();

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

    const getSystemMessageText = (message: MessageProxy) => {
        if (message.firstOfDay) return message.firstOfDay;
        if (message.type === 'system') return message.text;
        if (message.isFirstUnread) return 'Непрочитанные';
        return '';
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
        if (inViewPrevPage) return getPrevPage();
        if (inViewNextPage) return getNextPage();
    }, [inViewPrevPage, inViewNextPage]);

    useEffect(() => {
        subscribeToChat(inViewLastMessageCheckVisibleRef && !chat?.pending_messages_count ? 'sub' : 'unsub');
    }, [inViewLastMessageCheckVisibleRef, chat?.pending_messages_count]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    <SystemMessage text={getSystemMessageText(message)} />
                    {message.type !== 'system' && (
                        <div
                            onMouseEnter={() => hoverMessage(message)}
                            className={styles.row}
                            style={{ justifyContent: message.isMy ? 'flex-end' : 'flex-start' }}
                            ref={getMessageRefs(message, index)}
                        >
                            {index === 5 && <div ref={nextPageRef} />}
                            <Message message={message} lastFive={messages.length - 5 < index} />
                            {messages?.length - 5 === index && <div ref={prevPageRef} />}
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}

export default MessagesListView;
