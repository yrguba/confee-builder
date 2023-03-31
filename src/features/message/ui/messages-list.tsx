import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessagesListView, useMessageStore, MessageTypes } from 'entities/message';
import { useToggle, useReverseTimer, useInView } from 'shared/hooks';

import { Button } from '../../../shared/ui';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;
    const params = useParams();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const refs = useRef({
        wrapper: useRef(null),
        lastMessage: useRef(null),
    });

    const [_, render] = useToggle();

    const { data, hasNextPage, hasPreviousPage, fetchPreviousPage, fetchNextPage, isLoading, isFetching } = MessageApi.handleGetMessages({
        chatId: params.chat_id,
        page: 1,
    });

    const { isRunning, time, reset, start } = useReverseTimer({ seconds: 1 });

    MessageApi.subscriptions((action: string) => {
        console.log(action);
        render();
    });

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    const handleScroll = ({ target }: any) => {
        if (!isRunning && !isFetching && hasNextPage && target.scrollTop < 200) {
            fetchNextPage().then();
            start();
        }
        if (!isRunning && !isFetching && hasPreviousPage && target?.scrollHeight - (target.scrollTop + target.clientHeight) < 200) {
            fetchPreviousPage().then();
            start();
        }
    };

    const reactionClick = (emoji: any) => {
        console.log(emoji);
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

    useEffect(() => {
        if (wrapperRef.current) {
            // wrapperRef.current.scroll({ top: wrapperRef.current.scrollHeight, behavior: 'smooth' });
            wrapperRef.current.scroll({ top: wrapperRef.current.scrollHeight });
        }
    }, [wrapperRef.current]);
    // console.log('render');
    console.log(isFetching);
    return (
        <MessagesListView
            pages={data?.pages.map((page) => page.data.data)}
            handleScroll={handleScroll}
            ref={null}
            textMessageMenuItems={items}
            reactionClick={reactionClick}
        />
    );
}

export default MessageList;
