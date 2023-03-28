import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, chatTypes } from 'entities/chat';

function ChatsList() {
    const { data, isLoading } = ChatApi.handleGetChats();

    const navigate = useNavigate();
    const params = useParams();

    const clickOnChat = (chat: chatTypes.Chat) => {
        if (Number(params.chat_id) !== chat.id) {
            navigate(`chat/${chat.id}`);
        }
    };
    return <ChatListView chats={data?.data?.data || []} clickOnChat={clickOnChat} activeChatId={Number(params.chat_id) || null} />;
}

export default ChatsList;
