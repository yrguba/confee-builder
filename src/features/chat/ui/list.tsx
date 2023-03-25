import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, chatTypes } from 'entities/chat';

function ChatsList() {
    const { data, isLoading } = ChatApi.handleGetChats();

    const navigate = useNavigate();

    const clickOnChat = (chat: chatTypes.Chat) => {
        navigate(`chat/${chat.id}`);
    };
    return <ChatListView chats={data?.data?.data || []} clickOnChat={clickOnChat} />;
}

export default ChatsList;
