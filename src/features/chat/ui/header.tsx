import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect } from 'react';

import { appService } from 'entities/app';
import { ChatHeaderView, chatApi } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { meetApi, meetTypes, useMeet, useMeetStore } from 'entities/meet';
import { useMessageStore, messageApi } from 'entities/message';
import { useEasyState, useRouter, useStorage, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';
import { TabBarTypes, Notification, Modal } from 'shared/ui';

import GroupChatProfileModal from './modals/profile/group';
import PrivateChatProfileModal from './modals/profile/private';
import { ChatTabsActions } from '../../../entities/chat/model/types';
import { ForwardMessagesModal } from '../../message';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData, isLoading } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const proxyChat = chatProxy(chatData);

    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const forwardMessages = useMessageStore.use.forwardMessages();
    const visibleSearchMessages = useMessageStore.use.visibleSearchMessages();

    const notification = Notification.use();

    const groupChatProfileModal = Modal.use();
    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();

    const { createMeet } = useMeet();

    const clickDeleteMessages = async () => {
        if (chatData) {
            handleDeleteMessage({
                chatId: chatData?.id,
                messageIds: highlightedMessages.value.map((i) => i.id),
                fromAll: true,
            });
            highlightedMessages.clear();
        }
    };

    const clickForwardMessages = async () => {
        forwardMessages.set({ fromChatName: chatData?.name || '', toChatId: null, messages: highlightedMessages.value, redirect: false });
        highlightedMessages.clear();
        forwardMessagesModal.open();
    };

    const clickCard = () => {
        if (proxyChat?.is_group) {
            groupChatProfileModal.open({ chatId: proxyChat.id });
        } else {
            if (proxyChat?.is_personal) return privateChatProfileModal.open({ user: proxyChat.secondUser });
            privateChatProfileModal.open({ employee: proxyChat?.secondEmployee });
        }
    };

    const tabsActions = (action: ChatTabsActions) => {
        switch (action) {
            case 'search':
                return visibleSearchMessages.set(!visibleSearchMessages.value);
            case 'goMeet':
                return proxyChat?.is_group
                    ? notification.info({ title: 'Звонки пока недоступны в групповых чатах' })
                    : createMeet(proxyChat?.id, proxyChat?.secondUser?.id);
        }
    };

    return (
        <>
            <GroupChatProfileModal {...groupChatProfileModal} />
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <ChatHeaderView
                back={() => navigate('/chats')}
                chat={chatProxy(chatData)}
                tabsActions={tabsActions}
                clickCard={clickCard}
                highlightedMessages={highlightedMessages}
                clickDeleteMessages={clickDeleteMessages}
                clickForwardMessages={clickForwardMessages}
                loading={isLoading}
            />
        </>
    );
}

export default ChatHeader;
