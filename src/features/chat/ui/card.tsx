import React from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, ChatTypes } from 'entities/chat';
import { ViewerService } from 'entities/viewer';

function ChatCard() {
    const navigate = useNavigate();
    const params = useParams();

    const viewerId = ViewerService.getId();

    const { data } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });

    const clickOnChat = (chat: ChatTypes.Chat) => {
        if (!ChatService.checkIsOpenChatInfo()) {
            if (chat.is_group) {
                navigate(`group_chat/${chat.id}/users`);
            } else {
                const userId = chat.users.find((userId) => userId !== viewerId);
                navigate(`private_chat/${userId}/images`);
            }
        }
    };

    const chat = data?.data?.data;

    return chat ? <ChatCardView chat={chat || null} subtitle={ChatService.getChatSubtitle(chat || null)} onClick={clickOnChat} /> : null;
}

export default ChatCard;
