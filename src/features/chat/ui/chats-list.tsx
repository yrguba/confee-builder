import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatsListView, chatApi, chatTypes } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/chat-proxy';
import { Input } from 'shared/ui';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const searchInput = Input.use({
        debounceDelay: 1000,
        debounceCallback: (value) => {
            console.log('search value', value);
        },
    });

    const { data: chatsData } = chatApi.handleGetChats();

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`/chats/chat/${chat.id}`);
    };

    return (
        <>
            <ChatsListView
                searchInput={searchInput}
                chats={chatsData?.map((chat) => ChatProxy(chat)) || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
            />
        </>
    );
}

export default ChatsList;
