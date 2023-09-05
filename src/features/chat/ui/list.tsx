import React from 'react';

import { ChatsListView, chatTypes, useChatsTabsAndLists } from 'entities/chat';
import { useRouter } from 'shared/hooks';

function ChatsList() {
    const { navigate, params, pathname } = useRouter();

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`chat/${chat?.id}`);
    };

    const tabsAndLists = useChatsTabsAndLists({});

    return <ChatsListView clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} tabsAndLists={tabsAndLists} />;
}

export default ChatsList;
