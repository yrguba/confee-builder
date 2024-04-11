import React from 'react';

import { ChatHeaderView, chatApi, chatService } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { ChatTabsActions } from 'entities/chat/model/types';
import { meetStore, useMeet } from 'entities/meet';
import { messageStore, messageApi } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import GroupChatProfileModal from './modals/profile/group';
import PrivateChatProfileModal from './modals/profile/private';
import { viewerStore } from '../../../entities/viewer';
import { getRandomString } from '../../../shared/lib';
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

    const calls = meetStore.use.calls();

    const viewer = viewerStore.use.viewer();

    const groupChatProfileModal = Modal.use();
    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();

    const { createMeet } = useMeet();

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
                const meetId = getRandomString(30);
                calls.set([
                    ...calls.value,
                    {
                        id: meetId,
                        name: proxyChat?.name || '',
                        avatar: proxyChat?.avatar || '',
                        status: 'outgoing',
                        userId: viewer.value.id,
                        muted: !!proxyChat?.is_muted,
                    },
                ]);
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
//
export default ChatHeader;
