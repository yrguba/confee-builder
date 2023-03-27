import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessagesListView, useMessageStore, messageSubscriptions } from 'entities/message';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;
    const params = useParams();
    if (!params.chat_id) return null;

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
        />
    );
}

export default MessageList;
