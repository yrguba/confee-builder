import React from 'react';

import { chatApi, ChatsListView, chatTypes, useChatsTabsAndLists } from 'entities/chat';
import { Actions, ChatProxy } from 'entities/chat/model/types';
import { useEasyState, useRouter } from 'shared/hooks';

import { Input } from '../../../shared/ui';

function ChatsList() {
    const { navigate, params, pathname } = useRouter();

    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const searchInput = Input.use({});

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
            searchInput={searchInput}
        />
    );
}

export default ChatsList;
