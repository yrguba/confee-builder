import React from 'react';

import { ChatHeaderView, chatApi, chatService } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { ChatTabsActions } from 'entities/chat/model/types';
import { useMeet } from 'entities/meet';
import { useMessageStore, messageApi } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import GroupChatProfileModal from './modals/profile/group';
import PrivateChatProfileModal from './modals/profile/private';
import { ForwardMessagesModal } from '../../message';

function ChatHeader() {
    const { params, navigate, pathname } = useRouter();

    const { data: chatData, isLoading } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const proxyChat = chatProxy(chatData?.data.data);
    const getMembersIdsWithoutMe = chatService.getMembersIdsWithoutMe(proxyChat);
    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const forwardMessages = useMessageStore.use.forwardMessages();
    const visibleSearchMessages = useMessageStore.use.visibleSearchMessages();

    const groupChatProfileModal = Modal.use();
    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();

    const { createMeet } = useMeet();

    const clickDeleteMessages = async () => {
        if (chatData) {
            handleDeleteMessage({
                chatId: chatData?.data.data.id,
                messageIds: highlightedMessages.value.map((i) => i.id),
                fromAll: true,
            });
            highlightedMessages.clear();
        }
    };

    const clickForwardMessages = async () => {
        forwardMessages.set({ fromChatName: chatData?.data.data.name || '', toChatId: null, messages: highlightedMessages.value, redirect: false });
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
                createMeet(proxyChat?.id, getMembersIdsWithoutMe);
        }
    };

    return (
        <>
            <GroupChatProfileModal {...groupChatProfileModal} />
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <ChatHeaderView
                back={() => navigate(-1)}
                chat={proxyChat}
                tabsActions={tabsActions}
                clickCard={clickCard}
                highlightedMessages={highlightedMessages}
                clickDeleteMessages={clickDeleteMessages}
                clickForwardMessages={clickForwardMessages}
            />
        </>
    );
}

export default ChatHeader;
