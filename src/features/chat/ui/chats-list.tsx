import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService, useChatStore } from 'entities/chat';
import { UserTypes, UserApi } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useModal } from 'shared/hooks';

import ChatProxy from '../../../entities/chat/lib/chat-proxy';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const createPrivateChatModal = useModal();
    const createGroupChatModal = useModal();

    const { data: chatsData } = ChatApi.handleGetChats();

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        navigate(`/chats/chat/${chat.id}`);
    };

    const openCreateChatModal = (name: string) => {
        if (name === 'Личные чаты') return createPrivateChatModal.open();
        if (name === 'Групповые чаты') return createGroupChatModal.open();
    };

    return (
        <>
            <ChatListView
                createChat={openCreateChatModal}
                chats={chatsData?.data?.map((chat) => ChatProxy(chat)) || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
            />
        </>
    );
}

export default ChatsList;
