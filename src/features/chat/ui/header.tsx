import React from 'react';

import { appService } from 'entities/app';
import { callsTypes, callsApi } from 'entities/calls';
import { ChatHeaderView, useChatStore, chatApi } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/chat-proxy';
import { useEasyState, useRouter, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });

    const setOpenRightSidebar = useChatStore.use.setOpenRightSidebar();

    const callUrl: string = chatData?.is_group
        ? `${callsTypes.Paths.AUDIO_GROUP}/${getRandomString(20)}`
        : `${callsTypes.Paths.AUDIO_PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callUrl, 'аудио звонок');

    const clickChatCard = () => {
        setOpenRightSidebar(true);
    };

    const testState = useEasyState(true);
    const clickChatAudioCall = () => {
        testState.toggle();
        // appService.tauriIsRunning ? webView?.open() : navigate(callUrl);
    };
    console.log(testState.value);

    return <ChatHeaderView back={() => navigate('/chats')} clickChatCard={clickChatCard} clickChatAudioCall={clickChatAudioCall} chat={ChatProxy(chatData)} />;
}

export default ChatHeader;
