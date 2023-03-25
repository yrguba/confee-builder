import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
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

    const getPage = (arg: 'prev' | 'next') => {
        if (arg === 'prev') {
            fetchPreviousPage().then();
        }
        if (arg === 'next') {
            fetchNextPage().then();
        }
    };
    console.log(data);
    return <MessagesListView messages={[]} getPage={getPage} />;
}

export default MessageList;
