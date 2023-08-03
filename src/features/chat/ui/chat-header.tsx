import React from 'react';

import { ChatHeaderView, useChatStore, chatApi } from 'entities/chat';
import { useRouter } from 'shared/hooks';

import ChatProxy from '../../../entities/chat/lib/chat-proxy';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const setOpenRightSidebar = useChatStore.use.setOpenRightSidebar();

    const clickChatCard = () => {
        setOpenRightSidebar(true);
    };

    return <ChatHeaderView back={() => navigate('/chats')} clickChatCard={clickChatCard} chat={ChatProxy(chatData?.data?.data)} />;
}

export default ChatHeader;
