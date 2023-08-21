import React from 'react';

import { appTypes } from 'entities/app';
import { chatApi, useChatStore } from 'entities/chat';
import { messageApi, MessagesListView, messageService, messageTypes, useMessageStore } from 'entities/message';
import { useRouter, useCopyToClipboard, useLifecycles, createMemo } from 'shared/hooks';
import { Modal, Notification } from 'shared/ui';

import { UserProfileModal } from '../../user';
import { ForwardMessagesModal } from '../index';

const memoUpdateMessages = createMemo((data) => messageService.getUpdatedList(data));

function MessageList() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();
    const chatId = Number(params.chat_id);

    const { mutate: handleReadMessage } = messageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const { mutate: handleSendReaction } = messageApi.handleSendReaction();

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const chatSubscription = useChatStore.use.chatSubscription();

    const replyMessage = useMessageStore.use.replyMessage();
    const editMessage = useMessageStore.use.editMessage();
    const forwardMessages = useMessageStore.use.forwardMessages();
    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const voiceRecordingInProgress = useMessageStore.use.voiceRecordingInProgress();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: messageService.getInitialPage(chatData) });

    const messages = memoUpdateMessages(messageData);

    const notification = Notification.use();

    const userProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();

    const confirmDeleteMessage = Modal.useConfirm<{ messageId: number }>((value, callbackData) => {
        value && callbackData && handleDeleteMessage({ chatId, messageIds: [callbackData.messageId], fromAll: true });
    });

    const subscribeToChat = (action: 'sub' | 'unsub') => {
        if (action === 'sub') {
            chatSubscription.set(chatId);
            handleSubscribeToChat(chatId);
            const lastMessage = messages[messages?.length - 1];
            if (lastMessage && !lastMessage?.is_read) {
                handleReadMessage({ chat_id: chatId, message_id: messages[messages?.length - 1]?.id });
            }
        } else {
            if (chatSubscription.value) handleUnsubscribeFromChat(chatSubscription.value);
            chatSubscription.set(null);
        }
    };

    const messageMenuAction = (action: messageTypes.MessageMenuActions, message: messageTypes.MessageProxy) => {
        switch (action) {
            case 'reply':
                return replyMessage.set(message);
            case 'edit':
                if (message.type !== 'text') return notification.info({ title: 'Пока недоступно для изменения', system: true });
                return editMessage.set(message);
            case 'fixed':
                return notification.inDev();
            case 'copy':
                copyToClipboard(message.text);
                return notification.success({ title: 'Текст скопирован в буфер', system: true });
            case 'forward':
                forwardMessages.set({ fromChatName: chatData?.name || '', toChatId: null, messages: [message], redirect: false });
                return forwardMessagesModal.open();
            case 'delete':
                return confirmDeleteMessage.open({ messageId: message.id });
            case 'highlight':
                return highlightedMessages.push(message);
        }
    };

    const clickReaction = (emoji: string, messageId: number) => {
        notification.inDev();
        // handleSendReaction({
        //     chatId,
        //     messageId,
        //     reaction: reactionConverter(emoji, 'html'),
        // });
    };

    const clickImage = (data: appTypes.ImagesSwiperProps) => {};

    const clickTag = (tag: string) => {
        const user = chatData?.members.find((i) => `@${i.nickname}` === tag);
        user ? userProfileModal.open() : notification.info({ title: `Имя ${tag} не найдено.`, system: true });
    };

    useLifecycles(
        () => {
            if (forwardMessages.value.toChatId && forwardMessages.value.toChatId !== chatId) {
                forwardMessages.clear();
            }
        },
        () => {
            highlightedMessages.clear();
            replyMessage.clear();
            editMessage.clear();
        }
    );

    return (
        <>
            <UserProfileModal {...userProfileModal} />
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <MessagesListView
                chat={chatData}
                messages={messages}
                getNextPage={() => hasNextPage && !isFetching && fetchNextPage().then()}
                getPrevPage={() => hasPreviousPage && !isFetching && fetchPreviousPage().then()}
                hoverMessage={(message: messageTypes.MessageProxy) => !message.is_read && handleReadMessage({ chat_id: chatId, message_id: message.id })}
                subscribeToChat={subscribeToChat}
                chatSubscription={chatSubscription.value}
                messageMenuAction={messageMenuAction}
                sendReaction={clickReaction}
                clickImage={clickImage}
                clickTag={clickTag}
                highlightedMessages={highlightedMessages}
                voiceRecordingInProgress={voiceRecordingInProgress.value}
            />
        </>
    );
}

export default MessageList;
