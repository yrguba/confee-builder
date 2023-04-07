import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, ChatTypes, useChatStore } from 'entities/chat';
import { ViewerService } from 'entities/viewer';
import { useEnding } from 'shared/hooks';

import { ChatProxy } from '../../../entities/chat/model/types';

function ChatCard() {
    const navigate = useNavigate();
    const params = useParams();

    const viewerId = ViewerService.getId();

    const socketAction = useChatStore.use.socketAction();

    const { data: chatData } = ChatApi.handleGetChats();
    const chat = chatData?.data?.find((chat) => chat.id === Number(params.chat_id));

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

    const getChatSubtitle = (chat: ChatProxy | undefined): string => {
        if (!chat) return '';
        if (chat.messageAction) {
            return chat.messageAction;
        }

        if (chat.is_group) {
            const word = useEnding(chat.users.length, ['участник', 'участника', 'участников']);
            return `${chat.users.length} ${word}`;
        }

        return chat?.message[0]?.text || 'title';
    };

    return <ChatCardView chat={chat} subtitle={getChatSubtitle(chat)} onClick={clickOnChat} />;
}

export default ChatCard;
