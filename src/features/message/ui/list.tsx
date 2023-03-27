import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessagesListView, useMessageStore } from 'entities/message';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;
    const params = useParams();
    if (!params.chat_id) return null;

    const { hasNextPage, hasPreviousPage, fetchPreviousPage, fetchNextPage } = MessageApi.handleGetMessages({ chatId: params.chat_id, page: 1 });
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<{ pages: { data: { data: [] } }[] }>(['get-messages', params.chat_id]);

    useEffect(() => {
        MessageApi.subscriptions();
    }, []);

    const getPage = (arg: 'prev' | 'next') => {
        if (arg === 'prev') {
            fetchPreviousPage().then();
        }
        if (arg === 'next') {
            fetchNextPage().then();
        }
    };
    console.log('data', data);
    return <MessagesListView messages={data ? data.pages.reduce((acc: any, item: any) => [...acc, ...item.data.data], []) : []} getPage={getPage} />;
}

export default MessageList;
