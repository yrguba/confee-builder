import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, ChatTypes } from 'entities/chat';
import { ViewerService } from 'entities/viewer';
import { useEnding, useToggle } from 'shared/hooks';

import { ChatProxy } from '../../../entities/chat/model/types';

function ChatCard() {
    const navigate = useNavigate();
    const params = useParams();

    const viewerId = ViewerService.getId();

    const [_, toggle] = useToggle();

    const { data: chatData } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });

    ChatApi.subscriptions((data) => {
        toggle();
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

    const getChatSubtitle = (chat: ChatProxy | null): string => {
        if (!chat) return '';
        if (chat.messageAction) {
            return chat.messageAction;
        }

        if (chat.is_group) {
            const word = useEnding(chat.users.length, ['участник', 'участника', 'участников']);
            return `${chat.users.length} ${word}`;
        }

        return 'title';
    };

    return <ChatCardView chat={chatData?.data?.data || null} subtitle={getChatSubtitle(chatData?.data?.data || null)} onClick={clickOnChat} />;
}

export default ChatCard;
