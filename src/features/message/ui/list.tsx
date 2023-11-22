import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useUpdateEffect } from 'react-use';
import { number } from 'yup';

import { chatApi, chatProxy, useChatStore } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { messageApi, MessagesListView, messageService, messageTypes, useMessageStore, messageProxy, messageConstants } from 'entities/message';
import { File } from 'entities/message/model/types';
import { UserProxy } from 'entities/user/model/types';
import { useRouter, useCopyToClipboard, useLifecycles, createMemo, useTextToSpeech, useEasyState, useFileUploader, useSaveMediaContent } from 'shared/hooks';
import { reactionConverter } from 'shared/lib';
import { Modal, Notification } from 'shared/ui';

import PrivateChatProfileModal from '../../chat/ui/modals/profile/private';
import { FilesToSendModal, ForwardMessagesModal } from '../index';

const memoUpdateMessages = createMemo(messageService.getUpdatedList);

function MessageList() {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();
    const chatId = Number(params.chat_id);

    const queryClient = useQueryClient();

    const { saveInDownload } = useSaveMediaContent();
    const messageIdToSearchForPage = useEasyState<number | null>(null);

    const { playSpeech } = useTextToSpeech();

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleSubscribeToChat } = chatApi.handleSubscribeToChat();
    const { mutate: handleUnsubscribeFromChat } = chatApi.handleUnsubscribeFromChat();

    const chatSubscription = useChatStore.use.chatSubscription();

    const replyMessage = useMessageStore.use.replyMessage();
    const editMessage = useMessageStore.use.editMessage();
    const forwardMessages = useMessageStore.use.forwardMessages();
    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const voiceRecordingInProgress = useMessageStore.use.voiceRecordingInProgress();
    const initialPage = useMessageStore.use.initialPage();
    const foundMessage = useMessageStore.use.foundMessage();
    const goDownList = useMessageStore.use.goDownList();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
        isLoading,
    } = messageApi.handleGetMessages({ chatId, initialPage: initialPage.value || messageService.getInitialPage(chatData) });

    const { data: messageOrder } = messageApi.handleGetMessageOrder({ chatId, messageId: messageIdToSearchForPage.value });
    const { mutate: handleReadMessage } = messageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const { mutate: handleSendReaction } = messageApi.handleSendReaction();

    const messages = memoUpdateMessages(messageData);

    const notification = Notification.use();

    const privateChatProfileModal = Modal.use();
    const forwardMessagesModal = Modal.use();
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
            const lastMessage = messages[messages?.length - 1];
            if (lastMessage && !lastMessage?.is_read) {
                handleReadMessage({ chat_id: chatId, message_id: messages[messages?.length - 1]?.id });
            }
        } else {
            if (chatSubscription.value) handleUnsubscribeFromChat(chatSubscription.value);
            chatSubscription.set(null);
        }
    };

    const messageMenuAction = (action: messageTypes.MessageMenuActions, message: messageTypes.MessageProxy, file: { blob: Blob; name: string } | null) => {
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
            case 'play':
                return playSpeech(message.text);
            case 'save':
                saveInDownload(file?.blob, file?.name);
                notification.success({ title: 'Файл сохранен', system: true });
        }
    };

    const clickReaction = (emoji: string, messageId: number) => {
        handleSendReaction({
            chatId,
            messageId,
            reaction: reactionConverter(emoji, 'html'),
        });
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
            <FilesToSendModal onClose={clear} modal={filesToSendModal} files={sortByAccept as any} />
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <MessagesListView
                chat={chatProxy(chatData)}
                messages={messages}
                getNextPage={() => hasNextPage && !isFetching && fetchNextPage().then()}
                getPrevPage={() => hasPreviousPage && !isFetching && fetchPreviousPage().then()}
                readMessage={readMessage}
                subscribeToChat={subscribeToChat}
                chatSubscription={chatSubscription.value}
                messageMenuAction={messageMenuAction}
                sendReaction={clickReaction}
                openChatProfileModal={openChatProfileModal}
                highlightedMessages={highlightedMessages}
                voiceRecordingInProgress={voiceRecordingInProgress.value}
                foundMessage={foundMessage.value ? messageProxy({ message: foundMessage.value }) : null}
                deleteFoundMessage={deleteFoundMessage}
                loading={isLoading}
                clickMessageReply={(message) => messageIdToSearchForPage.set(message.id)}
                dropContainerRef={dropContainerRef}
                goDownList={goDownList.value}
            />
        </>
    );
}

export default MessageList;
