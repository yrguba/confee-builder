import React, { useTransition } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService, useChatStore } from 'entities/chat';

function ChatsList() {
    const { data, isLoading } = ChatApi.handleGetChats();

    const setInitialPage = useChatStore.use.setInitialPage();

    const navigate = useNavigate();
    const params = useParams();

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        const { id, totalMessages, pending_messages, is_group } = chat;
        const page = totalMessages && pending_messages ? Math.ceil(totalMessages / pending_messages) : 1;
        setInitialPage(page);

        if (Number(params.chat_id) !== id) {
            if (ChatService.checkIsOpenChatInfo()) {
                if (is_group) {
                    return navigate(`/main/chats/chat/${id}/group_chat/${id}/users`);
                }
                return navigate(`/main/chats/chat/${id}/private_chat/${23}/images`);
            }
            navigate(`/main/chats/chat/${id}`);
        }
    };
    return <ChatListView chats={data?.data?.data || []} clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} />;
}

export default ChatsList;
