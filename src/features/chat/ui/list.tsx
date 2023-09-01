import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatsListView, chatApi, chatTypes, useChatsTabsAndLists, chatProxy } from 'entities/chat';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const { data: allChatsData } = chatApi.handleGetChats({ type: 'all' });
    const { data: personalChatsData } = chatApi.handleGetChats({ type: 'personal' });
    const { data: companyChatsData } = chatApi.handleGetChats({ type: 'company' });

    const clickOnChatCard = useCallback((chat: chatTypes.Chat) => {
        navigate(`/chats/chat/${chat?.id}`);
    }, []);

    const proxy = (chats: chatTypes.Chat[] | undefined) => {
        if (chats?.length) {
            return chats.map((i) => chatProxy(i));
        }
        return [];
    };

    const tabsAndLists = useChatsTabsAndLists({ all: proxy(allChatsData), personal: proxy(personalChatsData), company: proxy(companyChatsData) });

    return <ChatsListView clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} tabsAndLists={tabsAndLists} />;
}

export default ChatsList;
