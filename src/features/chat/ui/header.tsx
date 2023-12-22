import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect } from 'react';

import { appService } from 'entities/app';
import { ChatHeaderView, chatApi } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { meetApi, meetTypes, useMeetStore } from 'entities/meet';
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
    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const notification = Notification.use();

    const groupChatProfileModal = Modal.use();
    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();

    const webView = useWebView({
        id: 'meet',
        title: `Конференция`,
        onClose: () => {},
    });

    const goMeet = async () => {
        const meetId = getRandomString(30);
        if (webView?.isOpen() || params.meet_id) {
            notification.info({ title: 'Сначала покиньте текущую конференцию', system: true });
        } else if (meetId && proxyChat?.secondUser?.id) {
            handleCreateMeeting({ chatId: proxyChat?.id, confee_video_room: meetId, target_user_id: proxyChat?.secondUser?.id });
            if (appService.tauriIsRunning) {
                webView?.open(`/meet/${meetId}`);
            } else {
                navigate(`/meet/${meetId}`);
            }
        }
    };

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
                return proxyChat?.is_group ? notification.info({ title: 'Звонки пока недоступны в групповых чатах' }) : goMeet();
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
