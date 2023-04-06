import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService } from 'entities/chat';
import { ViewerService } from 'entities/viewer';
import { useToggle, useArray } from 'shared/hooks';
import { uniqueArray } from 'shared/lib';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const viewerId = ViewerService.getId();

    const [_, render] = useToggle();
    const [messageActions, setMessageActions] = useState<{ chatId: number; user: string }[]>([]);

    ChatApi.subscriptions((data) => {
        if (data.action === 'message-action') {
            const chatId = data.data.chat_id;
            const item = { chatId, user: `${data.data.user.name} печатает...` };
            const found = messageActions.find((i) => i.chatId === chatId);
            const timeout = setTimeout(() => setMessageActions((prev) => [...prev.filter((i) => i.chatId !== chatId)]), 5000);
            if (found) {
                clearTimeout(timeout);
                setMessageActions((prev) => uniqueArray(messageActions, 'chatId'));
            } else {
                setMessageActions((prev) => uniqueArray([...prev, item], 'chatId'));
            }
        } else {
            render();
        }
    });

    const { data, isLoading } = ChatApi.handleGetChats();

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
    return (
        <ChatListView chats={data?.data || []} messageActions={messageActions} clickOnChat={clickOnChatCard} activeChatId={Number(params.chat_id) || null} />
    );
}

export default ChatsList;
