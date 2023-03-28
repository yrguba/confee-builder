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
            navigate(`group_chat/${chat.id}/users`);
        } else {
            navigate(`private_chat/${23}/images`);
        }
    };

    const chat = data?.data?.data;

    return chat ? <ChatCardView chat={chat || null} subtitle={ChatService.getChatSubtitle(chat || null)} onClick={clickOnChat} /> : null;
}

export default ChatCard;
