import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { ChatApi, ChatService } from 'entities/chat';
import { messageProxy, MessageApi, MessagesListView, useMessageStore, MessageTypes } from 'entities/message';
import { ViewerService } from 'entities/viewer';

import { Modal, useModal } from '../../../shared/ui';

type Props = {};

function MessageList(props: Props) {
    const params = useParams();

    const chatId = Number(params.chat_id);
    const viewerId = ViewerService.getId();
    const confirmDelete = useModal();

    const socketAction = useMessageStore.use.socketAction();
    const deletedMessages = useMessageStore.use.deletedMessages();
    const setDeletedMessage = useMessageStore.use.setDeletedMessage();

    const { data: chatData } = ChatApi.handleGetChats();
    const chat = chatData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const { mutate: handleSendReaction } = MessageApi.handleSendReaction();
    const handleReadMessage = MessageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = MessageApi.handleDeleteMessage();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = MessageApi.handleGetMessages({ chatId, initialPage: ChatService.getInitialPage(chat) });

    const reactionClick = (messageId: number, reaction: any) => handleSendReaction({ chatId, messageId, reaction });

    const readMessage = (messageId: number) => {
        if (chat?.pending_messages) handleReadMessage({ chat_id: chatId, messages: [messageId] });
    };

    const deleteMessages = () => {
        handleDeleteMessage({ messages: deletedMessages.map((msg) => String(msg.id)), chatId, fromAll: true });
        setDeletedMessage([]);
        confirmDelete.close();
    };

    const getPrevPage = () => {
        readMessage(messageData?.pages[messageData?.pages.length - 1].id || 0);
        hasPreviousPage && !isFetching && fetchPreviousPage().then();
    };
    const getNextPage = () => {
        hasNextPage && !isFetching && fetchNextPage().then();
    };

    useEffect(() => {
        if (deletedMessages.length) {
            confirmDelete.open();
        }
    }, [deletedMessages.length]);

    return (
        <>
            <Modal {...confirmDelete} onOk={deleteMessages} onClose={() => setDeletedMessage([])}>
                <div>удалить сообщение ?</div>
            </Modal>
            <MessagesListView
                chat={chat}
                messages={messageData?.pages.map((message: MessageTypes.Message, index: number) =>
                    messageProxy(messageData?.pages[index - 1], message, viewerId)
                )}
                getNextPage={getNextPage}
                getPrevPage={getPrevPage}
                readMessage={readMessage}
                reactionClick={reactionClick}
            />
        </>
    );
}

export default MessageList;
