import { useQueryClient } from '@tanstack/react-query';
import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useChatStore, ChatApi, ChatService } from 'entities/chat';
import { MessageApi, MessagesListView, useMessageStore, MessageTypes, messageConstants } from 'entities/message';
import { useToggle, useReverseTimer, useInView } from 'shared/hooks';
import { reactionConverter } from 'shared/lib';

import { MessageProxy } from '../../../entities/message/model/types';
import { ViewerService } from '../../../entities/viewer';
import { Button } from '../../../shared/ui';

type Props = {};

function MessageList(props: Props) {
    const params = useParams();

    const chatId = Number(params.chat_id);

    const socketAction = useMessageStore.use.socketAction();
    console.log(socketAction);
    const { data: chatData } = ChatApi.handleGetChats();
    const chat = chatData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const { mutate: handleSendReaction } = MessageApi.handleSendReaction();
    const handleReadMessage = MessageApi.handleReadMessage();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = MessageApi.handleGetMessages({ chatId, initialPage: ChatService.getInitialPage(chat) });

    const reactionClick = (messageId: number, reaction: any) => handleSendReaction({ chatId, messageId, reaction: reactionConverter(reaction, 'html') });
    const readMessage = (messageId: number) => {
        if (chat?.pending_messages) handleReadMessage({ chat_id: chatId, messages: [messageId] });
    };

    const getPrevPage = () => {
        readMessage(messageData?.pages[messageData?.pages.length - 1].id);
        hasPreviousPage && !isFetching && fetchPreviousPage().then();
    };
    const getNextPage = () => {
        hasNextPage && !isFetching && fetchNextPage().then();
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

    return (
        <MessagesListView
            chat={chat}
            messages={messageData?.pages}
            getNextPage={getNextPage}
            getPrevPage={getPrevPage}
            readMessage={readMessage}
            textMessageMenuItems={items}
            reactionClick={reactionClick}
        />
    );
}

export default MessageList;
