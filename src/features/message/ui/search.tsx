import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useUpdateEffect } from 'react-use';
import { number } from 'yup';

import { messageApi, SearchMessagesView, messageStore } from 'entities/message';
import { Message } from 'entities/message/model/types';
import { useRouter, createMemo, useWidthMediaQuery, useEasyState } from 'shared/hooks';
import { Input } from 'shared/ui';

import { getUniqueArr } from '../../../shared/lib';

const memoUpdateMessages = createMemo((pages) =>
    getUniqueArr(pages?.reduce((messages: any, page: any) => [...[...messages, ...page.data.data]], []) || [], 'id')
);

function SearchMessages() {
    const { params } = useRouter();

    const xl = useWidthMediaQuery().from('xl');

    const chatId = Number(params.chat_id);
    const queryClient = useQueryClient();

    const searchInput = Input.use({});

    const messageIdToSearchForPage = useEasyState<number | null>(null);

    const { data: searchMessages, hasNextPage, fetchNextPage } = messageApi.handleSearchMessages({ chatId, text: searchInput.value });
    const { data: messageOrder } = messageApi.handleGetMessageOrder({ chatId, messageId: messageIdToSearchForPage.value });

    const visibleSearchMessages = messageStore.use.visibleSearchMessages();
    const initialPage = messageStore.use.initialPage();
    const foundMessage = messageStore.use.foundMessage();

    const getNextPage = () => {
        hasNextPage && fetchNextPage();
    };

    useUpdateEffect(() => {
        if (messageOrder?.in_page) {
            initialPage.set(messageOrder?.in_page);
            foundMessage.set(messageOrder);
            !xl && visibleSearchMessages.set(false);
            setTimeout(() => {
                queryClient.prefetchInfiniteQuery(['get-messages', chatId]);
            }, 100);
        }
    }, [messageOrder?.id]);

    return (
        <SearchMessagesView
            getNextPage={getNextPage}
            messages={memoUpdateMessages(searchMessages?.pages) as any}
            searchInput={searchInput}
            close={() => visibleSearchMessages.set(false)}
            clickMessage={(message) => messageIdToSearchForPage.set(message.id)}
        />
    );
}

export default SearchMessages;
