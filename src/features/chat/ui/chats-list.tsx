import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService } from 'entities/chat';
import { ViewerService } from 'entities/viewer';
import { useToggle } from 'shared/hooks';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const viewerId = ViewerService.getId();

    const [_, render] = useToggle();

    const { data: chatData } = ChatApi.handleGetChats();

    ChatApi.subscriptions((data) => {
        console.log(data);
        render();
    });

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        const { id, is_group } = chat;

        if (Number(params.chat_id) !== id) {
            if (ChatService.checkIsOpenChatInfo()) {
                if (is_group) {
                    return navigate(`/main/chats/chat/${id}/group_chat/${id}/users`);
                }
                const userId = chat.users.find((userId) => userId !== viewerId);
                return navigate(`/main/chats/chat/${id}/private_chat/${userId}/images`);
            }
            navigate(`/main/chats/chat/${id}`);
        }
    };
    return <ChatListView chats={chatData?.data || []} clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} />;
}

export default ChatsList;
