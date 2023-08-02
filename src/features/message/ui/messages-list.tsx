import React from 'react';

import { storage } from 'entities/app';
import { chatApi } from 'entities/chat';
import { messageApi, MessagesListView, messageService } from 'entities/message';
import { useRouter } from 'shared/hooks';

import { MessageMenuActions, MessageProxy } from '../../../entities/message/model/types';

function MessageList() {
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

    const subscribeToChat = (action: 'sub' | 'unsub') => {
        action === 'sub' ? handleSubscribeToChat(chatId) : handleUnsubscribeFromChat(storage.localStorageGet('subscribed_to_chat'));
    };

    const messageMenuAction = (action: MessageMenuActions) => {
        console.log(action);
    };

    return (
        <>
            <MessagesListView
                chat={chatData}
                messages={messageService.getUpdatedList(messageData)}
                getNextPage={() => hasNextPage && !isFetching && fetchNextPage().then()}
                getPrevPage={() => hasPreviousPage && !isFetching && fetchPreviousPage().then()}
                hoverMessage={(message: MessageProxy) => !message.is_read && handleReadMessage({ chat_id: chatId, message_id: message.id })}
                subscribeToChat={subscribeToChat}
                messageMenuAction={messageMenuAction}
            />
        </>
    );
}

export default MessageList;
