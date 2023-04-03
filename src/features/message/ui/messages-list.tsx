import { useQueryClient } from '@tanstack/react-query';
import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useChatStore, ChatApi } from 'entities/chat';
import { MessageApi, MessagesListView, useMessageStore, MessageTypes, messageConstants } from 'entities/message';
import { useToggle, useReverseTimer, useInView } from 'shared/hooks';
import { reactionConverter } from 'shared/lib';

import { Button } from '../../../shared/ui';

type Props = {};

function MessageList(props: Props) {
    const params = useParams();
    const [_, render] = useToggle();

    const chatId = Number(params.chat_id);

    MessageApi.subscriptions((action: string) => {
        console.log(action);
        render();
    });

    const { data: chatData } = ChatApi.handleGetChat({ chatId });
    const chat = chatData?.data?.data;
    const handleReadMessage = MessageApi.handleReadMessage();
    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isLoading,
        isFetching,
    } = MessageApi.handleGetMessages({
        chatId,
        page: chat?.totalMessages ? (chat?.pending_messages ? Math.ceil(chat.pending_messages / messageConstants.message_limit) : undefined) : 1,
    });

    const { mutate: handleSendReaction } = MessageApi.handleSendReaction();

    const getPrevPage = () => {
        if (hasPreviousPage && !isFetching) {
            fetchPreviousPage().then();
        }
    };

    const getNextPage = () => {
        if (hasNextPage && !isFetching) {
            fetchNextPage().then();
        }
    };

    const readMessage = (messageId: number) => {
        handleReadMessage({ chat_id: chatId, messages: [messageId] });
    };

    const reactionClick = (messageId: number, reaction: any) => {
        handleSendReaction({ chatId, messageId, reaction: reactionConverter(reaction, 'html') });
    };

    const items: MessageTypes.MessageMenuItem[] = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer' },
        { id: 1, title: 'Переслать сообщение', icon: 'forward' },
        { id: 2, title: 'Скопировать текст', icon: 'copy' },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit' },
        { id: 4, title: 'Удалить сообщение', icon: 'delete' },
        { id: 5, title: 'Упомянуть автора', icon: 'mention' },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert' },
    ];

    const messages: MessageTypes.Message[] | undefined = messageData?.pages.reduce((messages, page) => [...messages, ...page], []);
    const firstPendingMessageId = messages ? messages.find((message) => message.message_status === 'pending')?.id : undefined;
    console.log(messageData?.pages);
    console.log(firstPendingMessageId);
    return (
        <MessagesListView
            chat={chatData?.data?.data}
            messages={messages}
            firstPendingMessageId={firstPendingMessageId}
            getNextPage={getNextPage}
            getPrevPage={getPrevPage}
            readMessage={readMessage}
            textMessageMenuItems={items}
            reactionClick={reactionClick}
        />
    );
}

export default MessageList;
