import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, ChatTypes } from 'entities/chat';
import { ViewerService } from 'entities/viewer';

function ChatCard() {
    const navigate = useNavigate();
    const params = useParams();

    const viewerId = ViewerService.getId();

    const [messageAction, setMessageAction] = useState<string>('');

    const { data: chatData } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const chat = ChatService.getChatInList(Number(params.chat_id));

    ChatApi.subscriptions((data) => {
        if (data && data.action === 'message-action' && chatData?.data?.data.id === Number(data.data.chat_id)) {
            setMessageAction(chatData?.data?.data.is_group ? `${data?.data?.user.name || ''} печатает...` : 'Печатает...');
            setTimeout(() => setMessageAction(''), 3000);
        }
    });

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

    return (
        <ChatCardView
            chat={chat || chatData?.data?.data || null}
            subtitle={messageAction || ChatService.getChatSubtitle(chat || chatData?.data?.data || null)}
            onClick={clickOnChat}
        />
    );
}

export default ChatCard;
