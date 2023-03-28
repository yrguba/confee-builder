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
        navigate(`chat/${chat.id}/info`);
    };

    const chat = data?.data?.data;

    return chat ? <ChatCardView chat={chat || null} subtitle={ChatService.getChatSubtitle(chat || null)} onClick={clickOnChat} /> : null;
}

export default ChatCard;
