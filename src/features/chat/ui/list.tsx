import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatsListView, chatApi, chatTypes } from 'entities/chat';
import ChatProxy from 'entities/chat/model/proxy';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const { data: chatsData } = chatApi.handleGetChats();

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`/chats/chat/${chat.id}`);
    };

    return (
        <>
            <ChatsListView
                chats={chatsData?.map((chat) => ChatProxy(chat)) || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
            />
        </>
    );
}

export default ChatsList;
