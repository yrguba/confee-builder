import React from 'react';

import { appService } from 'entities/app';
import { callsTypes } from 'entities/calls';
import { ChatHeaderView, chatApi } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/proxy';
import { useRouter, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';
import { TabBarTypes, Notification } from 'shared/ui';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });

    const notification = Notification.use();
    const callUrl: string = chatData?.is_group
        ? `${callsTypes.Paths.AUDIO_GROUP}/${getRandomString(20)}`
        : `${callsTypes.Paths.AUDIO_PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callUrl, 'аудио звонок');

    const clickChatAudioCall = async () => {
        if (appService.tauriIsRunning) {
            webView?.open();
        } else {
            navigate(`/calls/${chatData?.is_group ? 'group' : 'private'}/${getRandomString(20)}`);
        }
    };

    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, icon: 'search', callback: () => notification.inDev() },
        { id: 1, icon: 'phone', callback: clickChatAudioCall },
        { id: 2, icon: 'videocam', callback: () => notification.inDev() },
        // { id: 3, icon: 'more', callback: () => 'more' },
    ];

    return <ChatHeaderView back={() => navigate('/chats')} chat={ChatProxy(chatData)} tabs={tabs} />;
}

export default ChatHeader;
