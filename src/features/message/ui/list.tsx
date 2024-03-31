import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi, chatProxy, chatStore } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { messageApi, MessagesListView, messageService, messageStore, messageProxy } from 'entities/message';
import { UserProxy } from 'entities/user/model/types';
import { useRouter, useLifecycles, createMemo, useEasyState, useFileUploader, useFs } from 'shared/hooks';
import { Modal } from 'shared/ui';

import MessageMenu from './menu';
import PrivateChatProfileModal from '../../chat/ui/modals/profile/private';
import { FilesToSendModal, ForwardMessagesModal } from '../index';

const memoUpdateMessages = createMemo(messageService.getUpdatedList);

function MessageList() {
    const { params } = useRouter();

    const chatId = Number(params.chat_id);

    const queryClient = useQueryClient();

    const messageIdToSearchForPage = useEasyState<number | null>(null);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const chatSubscription = chatStore.use.chatSubscription();

    const replyMessage = messageStore.use.replyMessage();
    const editMessage = messageStore.use.editMessage();
    const forwardMessages = messageStore.use.forwardMessages();
    const openForwardMessageModal = messageStore.use.openForwardMessageModal();
    const highlightedMessages = messageStore.use.highlightedMessages();
    const voiceRecordingInProgress = messageStore.use.voiceRecordingInProgress();
    const initialPage = messageStore.use.initialPage();
    const foundMessage = messageStore.use.foundMessage();
    const goDownList = messageStore.use.goDownList();
    const isFileDrag = messageStore.use.isFileDrag();
    const menuMessageId = messageStore.use.menuMessageId();
    const downloadFile = messageStore.use.downloadFile();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
        isLoading,
    } = messageApi.handleGetMessages({ chatId, initialPage: initialPage.value || messageService.getInitialPage(chatData?.data.data) });

    const { data: messageOrder } = messageApi.handleGetMessageOrder({ chatId, messageId: messageIdToSearchForPage.value });
    const { mutate: handleReadMessage } = messageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const initialOpenChat = chatStore.use.initialOpenChat();

    const messages = memoUpdateMessages(messageData);

    const privateChatProfileModal = Modal.use();

    const filesToSendModal = Modal.use();

    const confirmDeleteMessage = Modal.useConfirm<{ messageId: number }>((value, callbackData) => {
        value && callbackData && handleDeleteMessage({ chatId, messageIds: [callbackData.messageId], fromAll: true });
    });

    const { sortByAccept, clear, dropContainerRef } = useFileUploader({
        accept: 'all',
        multiple: true,
        onAfterUploading: (data) => {
            if (data.sortByAccept) {
                filesToSendModal.open();
            }
        },
    });

    const subscribeToChat = (action: 'sub' | 'unsub') => {
        if (action === 'sub') {
            chatSubscription.set(chatId);
            handleSubscribeToChat(chatId);
            const lastMessage = messages[0];
            if (lastMessage && lastMessage?.is_read) {
                handleReadMessage({ chat_id: chatId, message_id: lastMessage.id });
            }
        } else {
            if (chatSubscription.value) handleUnsubscribeFromChat(chatSubscription.value);
            chatSubscription.set(null);
        }
    };

    const openChatProfileModal = (data: { user?: UserProxy; employee?: EmployeeProxy }) => {
        privateChatProfileModal.open(data);
    };

    const readMessage = (message_id: number) => {
        handleReadMessage({ chat_id: chatId, message_id });
    };

    const deleteFoundMessage = () => {
        messageIdToSearchForPage.set(null);
        foundMessage.set(null);
    };

    useUpdateEffect(() => {
        if (messageOrder?.in_page) {
            initialPage.set(messageOrder?.in_page);
            foundMessage.set(messageOrder);
            setTimeout(() => {
                queryClient.prefetchInfiniteQuery(['get-messages', chatId]);
            }, 500);
        }
    }, [messageOrder?.id]);

    useLifecycles(
        () => {
            initialOpenChat.set(true);
            if (forwardMessages.value?.toChatId && forwardMessages.value.toChatId !== chatId) {
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
            <FilesToSendModal onClose={clear} modal={filesToSendModal} files={sortByAccept as any} />
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />

            <PrivateChatProfileModal {...privateChatProfileModal} />
            <MessagesListView
                MessageMenu={MessageMenu}
                chat={chatProxy(chatData?.data.data)}
                messages={messages}
                getNextPage={() => hasNextPage && !isFetching && fetchNextPage().then()}
                getPrevPage={() => hasPreviousPage && !isFetching && fetchPreviousPage().then()}
                readMessage={readMessage}
                subscribeToChat={subscribeToChat}
                chatSubscription={chatSubscription.value}
                openChatProfileModal={openChatProfileModal}
                highlightedMessages={highlightedMessages}
                voiceRecordingInProgress={voiceRecordingInProgress.value}
                foundMessage={foundMessage.value ? messageProxy({ message: foundMessage.value }) : null}
                deleteFoundMessage={deleteFoundMessage}
                loading={isLoading}
                clickMessageReply={(message) => messageIdToSearchForPage.set(message.id)}
                dropContainerRef={dropContainerRef}
                goDownList={goDownList.value}
                isFileDrag={isFileDrag}
                initialOpenChat={initialOpenChat}
                isFetching={isFetching}
                menuMessageId={menuMessageId}
                clearDownloadFile={downloadFile.clear}
            />
        </>
    );
}

export default MessageList;
