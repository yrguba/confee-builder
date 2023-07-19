import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, ChatTypes, useChatStore, ChatProxy } from 'entities/chat';
import { UserService } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useEnding } from 'shared/hooks';

function ChatCard() {
    const navigate = useNavigate();
    const params = useParams();

    const viewer = ViewerService.getViewer();

    const socketAction = useChatStore.use.socketAction();

    const { data: chatData } = ChatApi.handleGetChats();
    const chat = chatData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const clickOnChat = (chat: ChatTypes.Chat) => {
        if (!ChatService.checkIsOpenChatInfo()) {
            if (chat.is_group) {
                navigate(`group_chat/${chat.id}/users`);
            } else {
                const userId = chat.members.find((user) => user.id !== viewer?.id);
                navigate(`private_chat/${userId}/images`);
            }
        }
    };

    const getChatSubtitle = (chat: ChatTypes.ChatProxy | undefined): string => {
        if (!chat) return '';
        if (chat.messageAction) {
            return chat.messageAction;
        }

        if (chat.is_group) {
            const word = useEnding(chat.members.length, ['участник', 'участника', 'участников']);
            return `${chat.members.length} ${word}`;
        }
        return UserService.getUserNetworkStatus(chat.secondMember) || '';
    };

    return (
        <ChatCardView
            chat={chat ? ChatProxy(chat) : undefined}
            maxWidth={170}
            subtitle={getChatSubtitle(chat ? ChatProxy(chat) : undefined)}
            onClick={clickOnChat}
        />
    );
}

export default ChatCard;
