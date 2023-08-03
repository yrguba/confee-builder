import React from 'react';

import { storage, useAppStore } from 'entities/app';
import { chatApi } from 'entities/chat';
import { messageApi, MessagesListView, messageService } from 'entities/message';
import { useRouter, useCopyToClipboard } from 'shared/hooks';

import { MessageMenuActions, MessageProxy } from '../../../entities/message/model/types';

function MessageList() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();

    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const { mutate: handleReadMessage } = messageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    // const setNotifications = useAppStore.use.setNotifications()

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: messageService.getInitialPage(chatData?.data?.data) });

    const subscribeToChat = (action: 'sub' | 'unsub') => {
        action === 'sub' ? handleSubscribeToChat(chatId) : handleUnsubscribeFromChat(storage.localStorageGet('subscribed_to_chat'));
    };

    const messageMenuAction = (action: MessageMenuActions, message: MessageProxy) => {
        switch (action) {
            case 'copy':
                copyToClipboard(message.text);
                break;
            case 'delete':
                handleDeleteMessage({ chatId, fromAll: true, messageIds: [message.id] });
        }
    };

    return (
        <>
            <MessagesListView
                chat={chatData?.data?.data}
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
