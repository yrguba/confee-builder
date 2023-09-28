import React from 'react';

import { chatApi, ChatsListView, chatTypes, useChatsTabsAndLists } from 'entities/chat';
import { Actions, ChatProxy } from 'entities/chat/model/types';
import { useEasyState, useRouter } from 'shared/hooks';

import { Input, Modal } from '../../../shared/ui';

function ChatsList() {
    const { navigate, params, pathname } = useRouter();

    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { mutate: handleLeaveChat } = chatApi.handleLeaveChat();

    const searchInput = Input.use({});

    const confirmDeleteChat = Modal.useConfirm<ChatProxy>((value, chat) => {
        if (value && chat) {
            const exitChat = () => {
                navigate(`/chats/${pathname.split('/')[2]}`);
            };
            chat?.is_group ? handleLeaveChat({ chatId: chat.id }, { onSuccess: exitChat }) : handleDeleteChat({ chatId: chat.id }, { onSuccess: exitChat });
        }
    });

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        navigate(`chat/${chat?.id}`);
    };

    const tabsAndLists = useChatsTabsAndLists({});

    const chatMenuAction = (action: Actions, chat: ChatProxy) => {
        switch (action) {
            case 'delete':
                return confirmDeleteChat.open(chat, {
                    okText: chat?.is_group ? 'Покинуть' : 'Удалить',
                    title: chat?.is_group ? 'Покинуть чат' : 'Удалить чат',
                });
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmDeleteChat} />
            <ChatsListView
                chatMenuAction={chatMenuAction}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
                tabsAndLists={tabsAndLists}
                searchInput={searchInput}
            />
        </>
    );
}

export default ChatsList;
