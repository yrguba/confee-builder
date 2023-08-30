import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatsListView, chatApi, chatTypes } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/proxy';

import { useArray } from '../../../shared/hooks';
import { TabBarTypes } from '../../../shared/ui';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const { data: chatsData } = chatApi.handleGetChats();

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`/chats/chat/${chat.id}`);
    };

    const tabs = useArray<TabBarTypes.TabBarItem>({ initialArr: [{ id: 0, title: 'Личные', callback: () => '' }] });

    return (
        <>
            <ChatsListView
                chats={chatsData?.map((chat) => ChatProxy(chat)) || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
                tabs={tabs}
            />
        </>
    );
}

export default ChatsList;
