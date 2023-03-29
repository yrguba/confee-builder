import React, { useTransition } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes } from 'entities/chat';

function ChatsList() {
    const { data, isLoading } = ChatApi.handleGetChats();

    const navigate = useNavigate();
    const params = useParams();
    const { pathname } = useLocation();

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        if (Number(params.chat_id) !== chat.id) {
            if (pathname.split('/').find((i) => ['group_chat', 'private_chat'].includes(i))) {
                if (chat.is_group) {
                    return navigate(`/main/chats/chat/${chat.id}/group_chat/${chat.id}/users`);
                }
                return navigate(`/main/chats/chat/${chat.id}/private_chat/${23}/images`);
            }
            navigate(`/main/chats/chat/${chat.id}`);
        }
    };
    return <ChatListView chats={data?.data?.data || []} clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} />;
}

export default ChatsList;
