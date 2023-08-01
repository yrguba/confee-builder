import React, { useEffect } from 'react';

import { storage } from 'entities/app';
import { chatApi, chatService, useChatStore, chatProxy } from 'entities/chat';
import { messageProxy, messageApi, MessagesListView, useMessageStore, messageTypes, messageService } from 'entities/message';
import { viewerService } from 'entities/viewer';
import { useRouter } from 'shared/hooks';

import { MessageProxy } from '../../../entities/message/model/types';

type Props = {};

function MessageList(props: Props) {
    const { params } = useRouter();

    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const { mutate: handleReadMessage } = messageApi.handleReadMessage();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: messageService.getInitialPage(chatData) });

    const getPrevPage = () => {
        hasPreviousPage && !isFetching && fetchPreviousPage().then();
    };

    const getNextPage = () => {
        hasNextPage && !isFetching && fetchNextPage().then();
    };

    const hoverMessage = (message: MessageProxy) => {
        if (!message.is_read && message.type !== 'system') {
            handleReadMessage({ chat_id: chatId, message_id: message.id });
        }
    };

    const subscribeToChat = (action: 'sub' | 'unsub') => {
        action === 'sub' ? handleSubscribeToChat(chatId) : handleUnsubscribeFromChat(storage.localStorageGet('subscribed_to_chat'));
    };

    return (
        <>
            <MessagesListView
                chat={chatData}
                messages={messageData?.pages.map((message: any, index: number) => messageProxy(messageData?.pages[index - 1], message)) || []}
                getNextPage={getNextPage}
                getPrevPage={getPrevPage}
                hoverMessage={hoverMessage}
                subscribeToChat={subscribeToChat}
            />
        </>
    );
}

export default MessageList;
