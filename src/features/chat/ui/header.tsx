import React from 'react';

import { appService } from 'entities/app';
import { callsTypes } from 'entities/calls';
import { ChatHeaderView, chatApi, chatTypes } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/proxy';
import { useRouter, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';
import { TabBarTypes, Notification, Modal } from 'shared/ui';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });

    const notification = Notification.use();

    const callPath = `${chatData?.is_group ? callsTypes.Paths.GROUP : callsTypes.Paths.PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callPath, 'аудио звонок');

    const chatSettingsModal = Modal.use<chatTypes.ModalName>('chat-settings');

    const clickChatAudioCall = async () => {
        if (appService.tauriIsRunning) {
            webView?.open();
        } else {
            navigate(callPath);
        }
    };

    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, icon: 'search', callback: () => notification.inDev() },
        { id: 1, icon: 'phone', callback: clickChatAudioCall },
        { id: 2, icon: 'videocam-outlined', callback: () => notification.inDev() },
        // { id: 3, icon: 'more', callback: () => 'more' },
    ];

    return <ChatHeaderView back={() => navigate('/chats')} chat={ChatProxy(chatData)} tabs={tabs} clickCard={chatSettingsModal.open} />;
}

export default ChatHeader;
