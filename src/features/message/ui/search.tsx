import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { messageApi, SearchMessagesView, useMessageStore } from 'entities/message';
import { Message } from 'entities/message/model/types';
import { useRouter, createMemo, useWidthMediaQuery } from 'shared/hooks';
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

    const { data: searchMessages, hasNextPage, fetchNextPage } = messageApi.handleSearchMessages({ chatId, text: searchInput.value });
    const visibleSearchMessages = useMessageStore.use.visibleSearchMessages();
    const initialPage = useMessageStore.use.initialPage();
    const foundMessage = useMessageStore.use.foundMessage();

    const getNextPage = () => {
        hasNextPage && fetchNextPage();
    };

    const clickMessage = (message: Message) => {
        initialPage.set(1);
        foundMessage.set(message);
        !xl && visibleSearchMessages.set(false);
        setTimeout(() => {
            queryClient.prefetchInfiniteQuery(['get-messages', chatId]);
        }, 200);
    };

    return (
        <SearchMessagesView
            getNextPage={getNextPage}
            messages={memoUpdateMessages(searchMessages?.pages) as any}
            searchInput={searchInput}
            close={() => visibleSearchMessages.set(false)}
            clickMessage={clickMessage}
        />
    );
}

export default SearchMessages;
