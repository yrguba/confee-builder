import React from 'react';

import { appService } from 'entities/app';
import { callsTypes } from 'entities/calls';
import { ChatHeaderView, chatApi } from 'entities/chat';
import ChatProxy from 'entities/chat/model/proxy';
import { useMessageStore, messageApi } from 'entities/message';
import { useRouter, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';
import { TabBarTypes, Notification, Modal } from 'shared/ui';

import ChatProfileModal from './modals/profile';
import { ForwardMessagesModal } from '../../message';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const forwardMessages = useMessageStore.use.forwardMessages();

    const notification = Notification.use();

    const callPath = `${chatData?.is_group ? callsTypes.Paths.GROUP : callsTypes.Paths.PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callPath, 'аудио звонок');

    const chatProfileModal = Modal.use();
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

    return (
        <>
            <ChatProfileModal {...chatProfileModal} />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <ChatHeaderView
                back={() => navigate('/chats')}
                chat={ChatProxy(chatData)}
                tabs={tabs}
                clickCard={chatProfileModal.open}
                highlightedMessages={highlightedMessages}
                clickDeleteMessages={clickDeleteMessages}
                clickForwardMessages={clickForwardMessages}
            />
        </>
    );
}

export default ChatHeader;
