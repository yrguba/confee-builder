import React from 'react';

import { List, chatApi } from 'entities/chat';

function ChatsList() {
    const { data, isLoading } = chatApi.handleGetChats();

    return <List list={data?.data} loading={isLoading} />;
}

export default ChatsList;
