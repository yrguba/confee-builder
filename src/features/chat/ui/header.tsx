import React from 'react';

import { appService } from 'entities/app';
import { callsTypes } from 'entities/calls';
import { ChatHeaderView, chatApi } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { useMessageStore, messageApi } from 'entities/message';
import { useRouter, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';
import { TabBarTypes, Notification, Modal } from 'shared/ui';

import PrivateChatProfileModal from './modals/profile/private';
import { ForwardMessagesModal } from '../../message';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData, isLoading } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const proxyChat = chatProxy(chatData);

    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const forwardMessages = useMessageStore.use.forwardMessages();

    const notification = Notification.use();

    const callPath = `${chatData?.is_group ? callsTypes.Paths.GROUP : callsTypes.Paths.PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callPath, 'аудио звонок');

    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();

    const clickChatAudioCall = async () => {
        if (appService.tauriIsRunning) {
            webView?.open();
        } else {
            navigate(callPath);
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

    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, icon: 'search', callback: () => notification.inDev() },
        { id: 1, icon: 'phone', callback: clickChatAudioCall },
        { id: 2, icon: 'videocam-outlined', callback: () => notification.inDev() },
    ];

    const clickCard = () => {
        if (proxyChat?.is_personal) return privateChatProfileModal.open({ user: proxyChat.secondUser });
        privateChatProfileModal.open({ employee: proxyChat?.secondEmployee });
    };

    return (
        <>
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <ChatHeaderView
                back={() => navigate('/chats')}
                chat={chatProxy(chatData)}
                tabs={tabs}
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
