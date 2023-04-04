import React, { useEffect, useTransition } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService, useChatStore } from 'entities/chat';
import { messageConstants } from 'entities/message';

import { useToggle } from '../../../shared/hooks';

function ChatsList() {
    const [_, render] = useToggle();

    ChatApi.subscriptions((action) => {
        console.log(action);
        render();
    });

    const { data, isLoading } = ChatApi.handleGetChats();

    const navigate = useNavigate();
    const params = useParams();

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        const { id, is_group } = chat;

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
