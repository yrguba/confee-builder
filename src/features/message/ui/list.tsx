import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessagesListView, useMessageStore, messageSubscriptions } from 'entities/message';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;
    const params = useParams();
    if (!params.chat_id) return null;

    messageSubscriptions();

    const { hasNextPage, hasPreviousPage, fetchPreviousPage, fetchNextPage } = MessageApi.handleGetMessages({ chatId: params.chat_id, page: 1 });
    const queryClient = useQueryClient();

    useMessageStore.use.subscriptionsTrigger();
    const data = queryClient.getQueryData<{ pages: { data: { data: [] } }[] }>(['get-messages', params.chat_id]);

    useEffect(() => {
        //
    }, []);

    const getPage = (arg: 'prev' | 'next') => {
        if (arg === 'prev') {
            fetchPreviousPage().then();
        }
        if (arg === 'next') {
            fetchNextPage().then();
        }
    };

    return <MessagesListView messages={data ? data.pages.reduce((acc: any, item: any) => [...acc, ...item.data.data.reverse()], []) : []} getPage={getPage} />;
}

export default MessageList;
