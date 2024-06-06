import React from 'react';

import { ChatHeaderView, chatApi, chatService, HighlightedMessagesView } from 'entities/chat';
import { messageStore, messageApi } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import { ForwardMessagesModal } from '../../message';

function HighlightedMessages() {
    const { params, navigate, pathname } = useRouter();

    const { data: chatData, isLoading } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const highlightedMessages = messageStore.use.highlightedMessages();
    const forwardMessages = messageStore.use.forwardMessages();

    const forwardMessagesModal = Modal.use();

    const clickDeleteMessages = async () => {
        if (chatData) {
            handleDeleteMessage({
                chatId: chatData?.data.data.id,
                messageIds: highlightedMessages.value?.map((i) => i.id),
                fromAll: true,
            });
            highlightedMessages.clear();
        }
    };

    const clickForwardMessages = async () => {
        forwardMessages.set({ fromChatName: chatData?.data.data.name || '', toChatId: null, messages: highlightedMessages.value, redirect: false });
        highlightedMessages.clear();
        forwardMessagesModal.open();
    };

    return (
        <>
            <ForwardMessagesModal {...forwardMessagesModal} />
            <HighlightedMessagesView
                highlightedMessages={highlightedMessages}
                clickDeleteMessages={clickDeleteMessages}
                clickForwardMessages={clickForwardMessages}
            />
        </>
    );
}
//
export default HighlightedMessages;
