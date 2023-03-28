import React from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, chatTypes } from 'entities/chat';

function ChatCard() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const { data } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });

    const clickOnChat = (chat: chatTypes.Chat) => {
        if (chat.is_group) {
            navigate(`chat/${chat.id}/group_chat/${chat.id}`);
        } else {
            navigate(`chat/${chat.id}/private_chat/${23}`);
        }
    };

    const chat = data?.data?.data;

    return chat ? <ChatCardView chat={chat || null} subtitle={ChatService.getChatSubtitle(chat || null)} onClick={clickOnChat} /> : null;
}

export default ChatCard;
