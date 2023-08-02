import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatsListView, chatApi, chatTypes } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/chat-proxy';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    // const createPrivateChatModal = useModal();
    // const createGroupChatModal = useModal();

    const { data: chatsData } = chatApi.handleGetChats();

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`/chats/chat/${chat.id}`);
    };

    const openCreateChatModal = (name: string) => {
        // if (name === 'Личные чаты') return createPrivateChatModal.open();
        // if (name === 'Групповые чаты') return createGroupChatModal.open();
    };

    return (
        <>
            <ChatsListView
                createChat={openCreateChatModal}
                chats={chatsData?.data?.map((chat) => ChatProxy(chat)) || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
            />
        </>
    );
}

export default ChatsList;
