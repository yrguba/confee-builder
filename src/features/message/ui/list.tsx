import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessagesListView, useMessageStore, messageSubscriptions, messageTypes } from 'entities/message';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;
    const params = useParams();

    const wrapperRef = useRef<HTMLDivElement>(null);

    messageSubscriptions();
    useMessageStore.use.subscriptionsTrigger();

    const { data, hasNextPage, hasPreviousPage, fetchPreviousPage, fetchNextPage, isLoading, isFetching } = MessageApi.handleGetMessages({
        chatId: params.chat_id,
        page: 1,
    });

    const handleScroll = ({ target }: any) => {
        const bottom = target?.scrollHeight - (target.scrollTop + target.clientHeight) < 100;

        if (!isFetching && hasNextPage && target.scrollTop < 100) {
            fetchNextPage().then();
        }
        if (!isFetching && hasPreviousPage && bottom) {
            fetchPreviousPage().then();
        }
    };

    const reactionClick = (emoji: any) => {
        console.log(emoji);
    };

    const items: messageTypes.MessageMenuItem[] = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer' },
        { id: 1, title: 'Переслать сообщение', icon: 'forward' },
        { id: 2, title: 'Скопировать текст', icon: 'copy' },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit' },
        { id: 4, title: 'Удалить сообщение', icon: 'delete' },
        { id: 5, title: 'Упомянуть автора', icon: 'mention' },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert' },
    ];

    useEffect(() => {
        if (wrapperRef.current) {
            // wrapperRef.current.scroll({ top: wrapperRef.current.scrollHeight, behavior: 'smooth' });
            wrapperRef.current.scroll({ top: wrapperRef.current.scrollHeight });
        }
    }, [wrapperRef.current]);

    return (
        <MessagesListView
            messages={data ? data.pages.reduce((acc: any, item: any) => [...acc, ...item.data.data.reverse()], []) : []}
            handleScroll={handleScroll}
            ref={wrapperRef}
            textMessageMenuItems={items}
            reactionClick={reactionClick}
        />
    );
}

export default MessageList;
