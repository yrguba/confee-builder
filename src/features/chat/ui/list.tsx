import React, { useEffect } from 'react';

import { chatApi, chatProxy, ChatsListView, chatTypes, useChatsTabsAndLists } from 'entities/chat';
import { PrivateChatActions, GroupChatActions, ChatProxy } from 'entities/chat/model/types';
import { useRouter } from 'shared/hooks';

import { chat_gtp_id } from '../../../entities/chat/lib/constants';
import mockChat from '../../../entities/chat/lib/mock';
import { useMessageStore } from '../../../entities/message';
import { viewerApi } from '../../../entities/viewer';
import { Input, Modal } from '../../../shared/ui';

function ChatsList() {
    const { navigate, params, pathname } = useRouter();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { mutate: handleLeaveChat } = chatApi.handleLeaveChat();
    const { mutate: handleChatMute } = chatApi.handleChatMute();

    const lastMessageWithChatGpt = useMessageStore.use.lastMessageWithChatGpt();

    const confirmDeleteChat = Modal.useConfirm<ChatProxy>((value, chat) => {
        if (value && chat) {
            const exitChat = () => {
                navigate(`/chats/${pathname.split('/')[2]}${params.company_id ? `/${params.company_id}` : ''}`);
            };
            if (chat.is_personal) {
                chat.is_group
                    ? handleLeaveChat({ type: 'personal', chatId: chat.id }, { onSuccess: exitChat })
                    : handleDeleteChat({ type: 'personal', chatId: chat.id }, { onSuccess: exitChat });
            } else {
                chat.is_group
                    ? handleLeaveChat({ type: 'company', chatId: chat.id, companyId: params.company_id }, { onSuccess: exitChat })
                    : handleDeleteChat({ companyId: params.company_id, type: 'company', chatId: chat.id }, { onSuccess: exitChat });
            }
        }
    });

    const clickOnChatCard = (chat: chatTypes.Chat) => {
        if (chat.id === chat_gtp_id) {
            navigate(`chat_gpt`);
        } else {
            navigate(`chat/${chat?.id}`);
        }
    };

    const tabsAndLists = useChatsTabsAndLists({});

    const chatMenuAction = (action: PrivateChatActions | GroupChatActions, chat: ChatProxy) => {
        switch (action) {
            case 'delete':
                return confirmDeleteChat.open(chat, {
                    okText: chat?.is_group ? 'Покинуть' : 'Удалить',
                    title: chat?.is_group ? 'Покинуть чат' : 'Удалить чат',
                });
            case 'mute':
                return handleChatMute({ chatId: chat.id, value: !chat.is_muted });
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmDeleteChat} />
            <ChatsListView
                lastMessageWithChatGpt={lastMessageWithChatGpt}
                chatMenuAction={chatMenuAction}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
                tabsAndLists={tabsAndLists}
                visibleChatGpt={!!viewerData?.companies.length}
            />
        </>
    );
}

export default ChatsList;
