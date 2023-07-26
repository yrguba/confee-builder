import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatCardView, ChatService, ChatApi, ChatTypes, useChatStore, ChatProxy } from 'entities/chat';
import { UserService } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useEnding } from 'shared/hooks';

function ChatCard() {
    const navigate = useNavigate();
    const params = useParams();

    const viewer = ViewerService.getViewer();

    // useChatStore.use.socketAction();

    const setOpenChatInfo = useChatStore.use.setOpenChatInfo();
    const openChatInfo = useChatStore.use.openChatInfo();

    const { data: chatData } = ChatApi.handleGetChats();

    const chat = chatData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const clickOnChat = (chat: ChatTypes.Chat) => {
        // if (!openChatInfo) {
        //     if (chat.is_group) {
        //         setOpenChatInfo({
        //             chatId: chat.id,
        //         });
        //     } else {
        //         const user = chat.members.find((user) => user.id !== viewer?.id);
        //         setOpenChatInfo({
        //             chatId: chat.id,
        //             userId: user?.id || null,
        //         });
        //     }
        // }
    };

    const getChatSubtitle = (chat: ChatTypes.ChatProxy | undefined): string => {
        if (!chat) return '';
        if (chat.messageAction) {
            return chat.messageAction;
        }

        if (chat.is_group) {
            const word = useEnding(chat.members.length, ['участник', 'участника', 'участников']);
            return `${chat.members.length} ${word}`;
        }
        const secondMember = chat?.members.find((i) => i.id !== viewer?.id);
        return UserService.getUserNetworkStatus(secondMember || null) || '';
    };

    return (
        <ChatCardView
            chat={chat ? ChatProxy(chat) : undefined}
            maxWidth={170}
            subtitle={getChatSubtitle(chat ? ChatProxy(chat) : undefined)}
            onClick={clickOnChat}
        />
    );
}

export default ChatCard;
