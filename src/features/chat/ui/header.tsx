import React from 'react';

import { callsTypes } from 'entities/calls';
import { ChatHeaderView, useChatStore, chatApi } from 'entities/chat';
import ChatProxy from 'entities/chat/lib/chat-proxy';
import { useRouter, useSip, useWebView } from 'shared/hooks';
import { getRandomString } from 'shared/lib';

import { viewerService } from '../../../entities/viewer';

function ChatHeader() {
    const { params, navigate } = useRouter();

    const tauriSip = {
        sip: 'sip:00015@79.137.209.164',
        pass: '1MQaEtmtETAguoLY',
    };
    const browserSip = {
        sip: 'sip:00001@79.137.209.164',
        pass: 'yj0OPzEOJ0JIMqqcO',
    };

    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const viewerId = viewerService.getId();
    const setOpenRightSidebar = useChatStore.use.setOpenRightSidebar();

    const sip = useSip(viewerId === 18 ? tauriSip : browserSip);

    const callUrl: string = chatData?.is_group
        ? `${callsTypes.Paths.AUDIO_GROUP}/${getRandomString(20)}`
        : `${callsTypes.Paths.AUDIO_PRIVATE}/${getRandomString(20)}`;

    const webView = useWebView(callUrl, 'аудио звонок');

    const clickChatCard = () => {
        setOpenRightSidebar(true);
    };

    const clickChatAudioCall = () => {
        const eventHandlers = {
            progress(e: any) {
                console.log('call is in progress');
            },
            failed(e: any) {
                console.log(`call failed with cause: `, e);
            },
            ended(e: any) {
                console.log(`call ended with cause: ${e}`);
            },
            confirmed(e: any) {
                console.log('call confirmed');
            },
        };

        const options = {
            eventHandlers,
        };
        sip.sendMessage(browserSip.sip, 'text', options);
    };

    return <ChatHeaderView back={() => navigate('/chats')} clickChatCard={clickChatCard} clickChatAudioCall={clickChatAudioCall} chat={ChatProxy(chatData)} />;
}

export default ChatHeader;
