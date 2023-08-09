import React from 'react';

import { chatApi, useChatStore } from 'entities/chat';
import { messageApi, MessagesListView, messageService, messageTypes } from 'entities/message';
import { MessageProxy } from 'entities/message/model/types';
import { useRouter, useCopyToClipboard } from 'shared/hooks';

function MessageList() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();

    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const { mutate: handleReadMessage } = messageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const setChatSubscription = useChatStore.use.setChatSubscription();
    const chatSubscription = useChatStore.use.chatSubscription();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: messageService.getInitialPage(chatData) });

    const messages: MessageProxy[] = messageService.getUpdatedList(messageData);

    const subscribeToChat = (action: 'sub' | 'unsub') => {
        if (action === 'sub') {
            handleSubscribeToChat(chatId);
            setChatSubscription(chatId);
            const lastMessage = messages[messages?.length - 1];
            if (lastMessage && !lastMessage?.is_read) {
                handleReadMessage({ chat_id: chatId, message_id: messages[messages?.length - 1]?.id });
            }
        } else {
            if (chatSubscription) handleUnsubscribeFromChat(chatSubscription);
            setChatSubscription(null);
        }
    };

    const messageMenuAction = (action: messageTypes.MessageMenuActions, message: messageTypes.MessageProxy) => {
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
                chat={chatData}
                messages={messages}
                getNextPage={() => hasNextPage && !isFetching && fetchNextPage().then()}
                getPrevPage={() => hasPreviousPage && !isFetching && fetchPreviousPage().then()}
                hoverMessage={(message: messageTypes.MessageProxy) => !message.is_read && handleReadMessage({ chat_id: chatId, message_id: message.id })}
                subscribeToChat={subscribeToChat}
                chatSubscription={chatSubscription}
                messageMenuAction={messageMenuAction}
            />
        </>
    );
}

export default MessageList;
