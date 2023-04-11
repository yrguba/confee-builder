import React, { useRef, Fragment, useEffect, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useParams } from 'react-router';

import { useInView } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Counter, Dropdown } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatTypes, ChatService } from '../../../chat';
import { MessageMenuItem, MessageProxy } from '../../model/types';
import MessageMenuView from '../menu';
import ImageMessageView from '../message/image';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';

type Props = {
    chat: ChatTypes.Chat | BaseTypes.Empty;
    messages: MessageProxy[] | BaseTypes.Empty;
    getPrevPage: () => void;
    getNextPage: () => void;
    readMessage: (messageId: number) => void;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, readMessage, getPrevPage, getNextPage, reactionClick } = props;

    const params = useParams();

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
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        if (chat?.id) {
            if (inViewPrevPage) {
                ChatService.subscribeToChat(chat.id);
                getPrevPage();
            } else {
                ChatService.unsubscribeFromChat(chat.id);
            }
        }
    }, [inViewPrevPage]);

    useEffect(() => {
        inViewNextPage && getNextPage();
    }, [inViewNextPage]);

    useEffect(() => {
        const checkChatIsSubscribed = ChatService.checkChatIsSubscribed();
        if (messageRef.current && (initial || checkChatIsSubscribed)) {
            messageRef.current.scrollIntoView({ block: 'center', behavior: checkChatIsSubscribed ? 'smooth' : 'auto' });
            setInitial(false);
        }
    }, [messageRef.current]);

    useEffect(() => {
        if (inViewFirsPendingMessage && messages) {
            const id = messages.find((message: MessageProxy) => message.isFirstUnread)?.id || null;
            if (id) {
                setTimeout(() => readMessage(id), 200);
            }
        }
    }, [inViewFirsPendingMessage, messageRef.current]);

    useEffect(() => {
        setInitial(true);
    }, [params.chat_id]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    {index === 5 && <div ref={nextPageRef} />}
                    {message.isFirstUnread && <SystemMessageView text="непрочитанные" />}
                    {message.firstOfDay && <SystemMessageView text={message.firstOfDay} />}
                    {message.message_type === 'system' && <SystemMessageView text={message.text} />}
                    <div className={styles.messageWrapper} ref={getMessageRef(message, index)}>
                        {message.message_type !== 'system' && (
                            <div className={styles.messageContent}>
                                <Dropdown
                                    top={messages?.length - index < 3 ? '100%' : 0}
                                    trigger="right-click"
                                    position={index < 4 ? 'right-bottom' : messages?.length - index < 3 ? 'right-top' : 'right-center'}
                                    content={
                                        <MessageMenuView
                                            permittedReactions={chat?.permittedReactions || []}
                                            reactionClick={(reaction) => reactionClick(message.id, reaction)}
                                            message={message}
                                        />
                                    }
                                >
                                    {message.message_type === 'text' && <TextMessageView message={message} reactionClick={reactionClick} />}
                                    {message.message_type === 'images' && <ImageMessageView message={message} reactionClick={reactionClick} />}
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    {index + 5 === messages?.length && <div ref={prevPageRef} />}
                </Fragment>
            ))}
            {chat?.pending_messages ? (
                <div className={styles.btnDown}>
                    <Counter>{chat.pending_messages}</Counter>
                </div>
            ) : null}
        </div>
    );
}

export default MessagesListView;
