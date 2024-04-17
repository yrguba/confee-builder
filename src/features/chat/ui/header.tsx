import React from 'react';

import { callStore, useCall } from 'entities/call';
import { ChatHeaderView, chatApi, chatService } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { ChatTabsActions } from 'entities/chat/model/types';
import { messageStore, messageApi } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import GroupChatProfileModal from './modals/profile/group';
import PrivateChatProfileModal from './modals/profile/private';
import { viewerStore } from '../../../entities/viewer';
import { getRandomString } from '../../../shared/lib';
import { ActiveCallListModal } from '../../call';
import { ForwardMessagesModal } from '../../message';

function ChatHeader() {
    const { params, navigate, pathname } = useRouter();

    const { data: chatData, isLoading } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const proxyChat = chatProxy(chatData?.data.data);
    const getMembersIdsWithoutMe = chatService.getMembersIdsWithoutMe(proxyChat);
    const highlightedMessages = messageStore.use.highlightedMessages();
    const forwardMessages = messageStore.use.forwardMessages();
    const visibleSearchMessages = messageStore.use.visibleSearchMessages();

    const viewer = viewerStore.use.viewer();

    const groupChatProfileModal = Modal.use();
    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();
    const activeCallListModal = Modal.use();

    const meet = useCall();

    const clickDeleteMessages = async () => {
        if (chatData) {
            handleDeleteMessage({
                chatId: chatData?.data.data.id,
                messageIds: highlightedMessages.value?.map((i) => i.id),
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
                meet.openCreateMeet(proxyChat);
        }
    };

    const clickActiveCallList = () => {
        activeCallListModal.open(proxyChat);
    };

    return (
        <>
            <ActiveCallListModal {...activeCallListModal} />
            <GroupChatProfileModal {...groupChatProfileModal} />
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <ChatHeaderView
                clickActiveCallList={clickActiveCallList}
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
//
export default ChatHeader;
