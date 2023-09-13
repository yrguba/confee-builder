import React from 'react';

import { chatApi, ChatsListView, chatTypes, useChatsTabsAndLists } from 'entities/chat';
import { useRouter } from 'shared/hooks';

import { Actions, ChatProxy } from '../../../entities/chat/model/types';

function ChatsList() {
    const { navigate, params, pathname } = useRouter();

    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`chat/${chat?.id}`);
    };

    const tabsAndLists = useChatsTabsAndLists({});

    const chatMenuAction = (action: Actions, chat: ChatProxy) => {
        switch (action) {
            case 'delete':
                return handleDeleteChat({ chatId: chat.id }, { onSuccess: () => params.chat_id && navigate('/chats') });
        }
    };

    return (
        <ChatsListView
            chatMenuAction={chatMenuAction}
            clickOnChat={clickOnChatCard}
            activeChatId={Number(params.chat_id) || null}
            tabsAndLists={tabsAndLists}
        />
    );
}

export default ChatsList;
