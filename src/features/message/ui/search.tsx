import React from 'react';

import { chatApi } from 'entities/chat';
import { messageApi, messageService, SearchMessagesView, useMessageStore } from 'entities/message';
import { useRouter, useCopyToClipboard, useEasyState, createMemo } from 'shared/hooks';
import { Input } from 'shared/ui';

const memoUpdateMessages = createMemo((pages) => pages?.reduce((messages: any, page: any) => [...messages, ...[...page.data.data]], []));

function SearchMessages() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();
    const chatId = Number(params.chat_id);

    const searchInput = Input.use({});

    const { data: searchMessages, hasNextPage, fetchNextPage } = messageApi.handleSearchMessages({ chatId, text: searchInput.value });
    const visibleSearchMessages = useMessageStore.use.visibleSearchMessages();

    const getNextPage = () => {
        hasNextPage && fetchNextPage();
    };

    return (
        <SearchMessagesView
            getNextPage={getNextPage}
            messages={memoUpdateMessages(searchMessages?.pages)}
            searchInput={searchInput}
            close={() => visibleSearchMessages.set(false)}
        />
    );
}

export default SearchMessages;
