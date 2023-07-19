import React, { useRef, Fragment, useEffect, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useParams } from 'react-router';
import { usePrevious } from 'react-use';

import { useInView } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Counter, Dropdown } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatTypes, ChatService } from '../../../chat';
import { File, MessageMenuItem, MessageProxy } from '../../model/types';
import DocumentMessageView from '../message/document';
import ForwardedMessagesView from '../message/forwarded';
import ImageMessageView from '../message/image';
import MessageMenuView from '../message/menu';
import ReplyMessageView from '../message/reply';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';
import VoiceMessageView from '../message/voice';

type Props = {
    chat: ChatTypes.Chat | BaseTypes.Empty;
    messages: MessageProxy[] | BaseTypes.Empty;
    getPrevPage: () => void;
    getNextPage: () => void;
    readMessage: (messageId: number) => void;
    reactionClick: (messageId: number, reaction: string) => void;
    setContentForModal: (content: File[]) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { chat, messages, readMessage, getPrevPage, getNextPage, reactionClick, setContentForModal } = props;

    const params = useParams();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    const [isVisibleDate, setIsVisibleDate] = useState(false);
    const [initial, setInitial] = useState(true);

    const prevMessages = usePrevious(messages);

    const { ref: prevPageRef, inView: inViewPrevPage } = useInView({ delay: 200 });
    const { ref: nextPageRef, inView: inViewNextPage } = useInView({ delay: 200 });
    const { ref: firstPendingMessagesRef, inView: inViewFirsPendingMessage } = useInView();
    const { ref: dateRef, inView: inViewDate } = useInView();

    const getMessageRef = (message: MessageProxy, index: number) => {
        if (!chat?.pending_messages_count) {
            if (messages?.length === index + 1) return messageRef;
        } else if (message.isFirstUnread) {
            return mergeRefs([messageRef, firstPendingMessagesRef]);
        }
        return null;
    };

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
        if (messageRef.current) {
            if (initial || checkChatIsSubscribed) {
                messageRef.current.scrollIntoView({ block: 'center', behavior: checkChatIsSubscribed ? 'smooth' : 'auto' });
                setInitial(false);
            }
        }
    }, [messageRef.current]);

    useEffect(() => {
        if (messageRef.current && prevMessages?.length && prevMessages.length + 1 === messages?.length) {
            if (messages[messages.length - 1].isMy) {
                messageRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    }, [messages]);

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

    useEffect(() => {
        // isVisibleDate && setTimeout(() => setIsVisibleDate(false), 2000);
    }, [isVisibleDate]);

    return (
        <div className={styles.wrapper} ref={wrapperRef} onScroll={() => setIsVisibleDate(true)}>
            {messages?.map((message, index) => (
                <Fragment key={message.id}>
                    {index === 5 && <div ref={nextPageRef} />}
                    {message.isFirstUnread && <SystemMessageView text="непрочитанные" />}
                    {message.firstOfDay && <SystemMessageView ref={dateRef} text={message.firstOfDay} />}
                    {/* {!inViewDate && <div className={styles.scrollDate}>{message.firstOfDay}</div>} */}
                    {message.type === 'system' && <SystemMessageView text={message.text} />}
                    <div className={`${styles.messageWrapper} ${message.isMy && styles.messageWrapper_my}`} ref={getMessageRef(message, index)}>
                        {message.type !== 'system' && (
                            <div className={`${styles.messageContent} ${message.isMy && styles.messageContent_my}`}>
                                <Dropdown
                                    closeAfterClick
                                    dynamicPosition
                                    reverseX={message.isMy}
                                    reverseY={index + 5 > messages?.length && messages?.length > 4}
                                    trigger="right-click"
                                    content={
                                        <MessageMenuView
                                            permittedReactions={chat?.permittedReactions || []}
                                            reactionClick={(reaction) => reactionClick(message.id, reaction)}
                                            message={message}
                                        />
                                    }
                                >
                                    {message.forwarded_from_messages?.length ? (
                                        <ForwardedMessagesView message={message} reactionClick={reactionClick} />
                                    ) : message.reply_to_message ? (
                                        <ReplyMessageView message={message} reply={message.reply_to_message} reactionClick={reactionClick} />
                                    ) : (
                                        <>
                                            {message.type === 'text' && (
                                                <TextMessageView chatUsers={chat?.members} message={message} reactionClick={reactionClick} />
                                            )}
                                            {message.type === 'images' && (
                                                <div onClick={() => (message.files.length ? setContentForModal(message.files) : () => {})}>
                                                    <ImageMessageView message={message} reactionClick={reactionClick} />
                                                </div>
                                            )}
                                            {message.type === 'voices' && <VoiceMessageView message={message} reactionClick={reactionClick} />}
                                            {message.type === 'documents' && <DocumentMessageView message={message} reactionClick={reactionClick} />}
                                        </>
                                    )}
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    {index + 2 === messages?.length && <div ref={prevPageRef} />}
                </Fragment>
            ))}
            {chat?.pending_messages_count ? (
                <div className={styles.btnDown}>
                    <Counter>{chat.pending_messages_count}</Counter>
                </div>
            ) : null}
        </div>
    );
}

export default MessagesListView;
