import React from 'react';

import { chatApi } from 'entities/chat';
import { SearchMessagesView, useMessageStore } from 'entities/message';
import { useRouter, useCopyToClipboard } from 'shared/hooks';

function SearchMessages() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();
    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const visibleSearchMessages = useMessageStore.use.visibleSearchMessages();

    return <SearchMessagesView close={() => visibleSearchMessages.set(false)} />;
}

export default SearchMessages;
