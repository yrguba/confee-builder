import React from 'react';

import { ImagesSwiperModalView, appTypes } from 'entities/app';
import { chatApi, useChatStore } from 'entities/chat';
import { messageApi, MessagesListView, messageService, messageTypes, useMessageStore } from 'entities/message';
import { MessageProxy } from 'entities/message/model/types';
import { useRouter, useCopyToClipboard, useEasyState } from 'shared/hooks';
import { Modal, Notification } from 'shared/ui';

import { reactionConverter } from '../../../shared/lib';

function MessageList() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();
    const chatId = Number(params.chat_id);

    const imagesState = useEasyState<appTypes.ImagesSwiperProps>({ images: [], startIndex: 1 });

    const { mutate: handleReadMessage } = messageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const { mutate: handleSendReaction } = messageApi.handleSendReaction();

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const chatSubscription = useChatStore.use.chatSubscription();

    const replyMessage = useMessageStore.use.replyMessage();
    const editMessage = useMessageStore.use.editMessage();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: messageService.getInitialPage(chatData) });

    const messages: MessageProxy[] = messageService.getUpdatedList(messageData);

    const notification = Notification.use();

    const imagesSwiperModal = Modal.use<appTypes.ModalName>('images-swiper');

    const confirmModal = Modal.useConfirm<{ messageId: number }>({
        title: 'Удалить сообщение',
        closeText: 'Отмена',
        okText: 'Удалить',
        callback: (value, callbackData) => {
            value && handleDeleteMessage({ chatId, messageIds: [callbackData.messageId], fromAll: true });
        },
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
                replyMessage.set(message);
                break;
            case 'edit':
                editMessage.set(message);
                break;
            case 'fixed':
                notification.inDev();
                break;
            case 'copy':
                copyToClipboard(message.text);
                notification.success({ title: 'Текст скопирован в буфер', system: true });
                break;
            case 'forward':
                notification.inDev();
                break;
            case 'delete':
                confirmModal.open({ messageId: message.id });
                break;
            case 'highlight':
                notification.inDev();
                break;
        }
    };

    const clickReaction = (emoji: string, messageId: number) => {
        handleSendReaction({
            chatId,
            messageId,
            reaction: reactionConverter(emoji, 'html'),
        });
    };

    const clickImage = (data: appTypes.ImagesSwiperProps) => {
        console.log(data);
        imagesState.set(data);
        imagesSwiperModal.open();
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
                chatSubscription={chatSubscription.value}
                messageMenuAction={messageMenuAction}
                sendReaction={clickReaction}
                clickImage={clickImage}
            />
            <Modal {...imagesSwiperModal}>
                <ImagesSwiperModalView {...imagesState.value} />
            </Modal>
        </>
    );
}

export default MessageList;
