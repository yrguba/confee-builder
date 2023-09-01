import React, { useCallback } from 'react';

import { ChatsListView, chatApi, chatTypes, useChatsTabsAndLists, chatProxy } from 'entities/chat';
import { useRouter } from 'shared/hooks';

import { createMemo } from '../../../shared/hooks';

const memoProxy = createMemo((chats: chatTypes.Chat[] | undefined) => {
    if (chats?.length) {
        return chats.map((i) => chatProxy(i));
    }
    return [];
});

function ChatsList() {
    const { navigate, params, pathname } = useRouter();

    const { data: allChatsData } = chatApi.handleGetChats({ type: 'all' });
    const { data: personalChatsData } = chatApi.handleGetChats({ type: 'personal' });
    const { data: companyChatsData } = chatApi.handleGetChats({ type: 'company' });

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`chat/${chat?.id}`);
    };

    const tabsAndLists = useChatsTabsAndLists({ all: memoProxy(allChatsData), personal: memoProxy(personalChatsData), company: memoProxy(companyChatsData) });

    return <ChatsListView clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} tabsAndLists={tabsAndLists} />;
}

export default ChatsList;
