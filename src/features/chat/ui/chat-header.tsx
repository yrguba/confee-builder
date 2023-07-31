import React from 'react';

import { ChatHeaderView, useChatStore, chatApi } from 'entities/chat';
import { useRouter } from 'shared/hooks';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: params.chat_id });
    const setOpenRightSidebar = useChatStore.use.setOpenRightSidebar();

    const clickChatCard = () => {
        setOpenRightSidebar(true);
    };

    return <ChatHeaderView back={() => navigate('/chats')} clickChatCard={clickChatCard} chat={chatData} />;
}

export default ChatHeader;
