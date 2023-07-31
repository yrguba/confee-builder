import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { chatApi, chatService, useChatStore, chatProxy } from 'entities/chat';
import { messageProxy, messageApi, MessagesListView, useMessageStore, messageTypes } from 'entities/message';
import { ViewerService } from 'entities/viewer';

type Props = {};

function MessageList(props: Props) {
    const params = useParams();

    const chatId = Number(params.chat_id);
    const viewerId = ViewerService.getId();

    const socketAction = useMessageStore.use.socketAction();

    const messagesToDelete = useMessageStore.use.messagesToDelete();
    const messagesToForward = useMessageStore.use.messagesToForward();
    const contentForModal = useMessageStore.use.contentForModal();

    const setMessagesToDelete = useMessageStore.use.setMessagesToDelete();
    const setMessagesToForward = useMessageStore.use.setMessagesToForward();
    const setContentForModal = useMessageStore.use.setContentForModal();

    const { data: chatsData } = chatApi.handleGetChats();
    const chat = chatsData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const { mutate: handleSendReaction } = messageApi.handleSendReaction();
    // const { mutate: handleReadMessage } = MessageApi.handleReadMessage();
    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const { mutate: handleForwardMessages } = messageApi.handleForwardMessages();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: chatService.getInitialPage(chat) });

    const reactionClick = (messageId: number, reaction: any) => handleSendReaction({ chatId, messageId, reaction });

    const readMessage = (messageId: number) => {
        // if (chat?.pending_messages_count) handleReadMessage({ chat_id: chatId, messages: [messageId] });
    };

    const deleteMessages = () => {
        handleDeleteMessage({ messages: messagesToDelete.map((msg) => String(msg.id)), chatId, fromAll: true });
        setMessagesToDelete([]);
        // modalConfirmDelete.close();
    };

    const getPrevPage = () => {
        readMessage(messageData?.pages[messageData?.pages.length - 1].id || 0);
        hasPreviousPage && !isFetching && fetchPreviousPage().then();
    };
    const getNextPage = () => {
        hasNextPage && !isFetching && fetchNextPage().then();
    };

    const onCloseModalChatsList = () => {
        // clearSelectedChats();
        setMessagesToForward([]);
    };

    const onOkModalChatsList = () => {
        // selectedChats.forEach((chat) => {
        //     handleForwardMessages({
        //         messagesIds: messagesToForward.map((i) => i.id),
        //         chatId: chat.id,
        //     });
        // });
        onCloseModalChatsList();
    };

    return (
        <>
            <MessagesListView
                chat={chat}
                messages={messageData?.pages.map((message: any, index: number) => messageProxy(messageData?.pages[index - 1], message))}
                getNextPage={getNextPage}
                getPrevPage={getPrevPage}
                readMessage={readMessage}
                reactionClick={reactionClick}
                setContentForModal={setContentForModal}
            />
        </>
    );
}

export default MessageList;
