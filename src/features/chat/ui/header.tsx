import React from 'react';

import { appService } from 'entities/app';
import { callsTypes } from 'entities/calls';
import { ChatHeaderView, chatApi, chatTypes } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/proxy';
import { useMessageStore, messageApi } from 'entities/message';
import { useRouter, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';
import { TabBarTypes, Notification, Modal } from 'shared/ui';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const highlightedMessages = useMessageStore.use.highlightedMessages();

    const notification = Notification.use();

    const callPath = `${chatData?.is_group ? callsTypes.Paths.GROUP : callsTypes.Paths.PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callPath, 'аудио звонок');

    const chatSettingsModal = Modal.use<chatTypes.Modals>('chatSettings');

    const clickChatAudioCall = async () => {
        if (appService.tauriIsRunning) {
            webView?.open();
        } else {
            navigate(callPath);
        }
    };

    const deleteMessages = async () => {
        if (chatData) {
            handleDeleteMessage({
                chatId: chatData?.id,
                messageIds: highlightedMessages.value.map((i) => i.id),
                fromAll: true,
            });
            highlightedMessages.clear();
        }
    };
    const forwardMessages = async () => {};

    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, icon: 'search', callback: () => notification.inDev() },
        { id: 1, icon: 'phone', callback: clickChatAudioCall },
        { id: 2, icon: 'videocam-outlined', callback: () => notification.inDev() },
        // { id: 3, icon: 'more', callback: () => 'more' },
    ];

    return (
        <ChatHeaderView
            back={() => navigate('/chats')}
            chat={ChatProxy(chatData)}
            tabs={tabs}
            clickCard={chatSettingsModal.open}
            highlightedMessages={highlightedMessages}
            deleteMessages={deleteMessages}
            forwardMessages={forwardMessages}
        />
    );
}

export default ChatHeader;
