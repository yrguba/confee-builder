import React, { useEffect } from 'react';

import { chatApi, chatService, useChatStore, chatProxy } from 'entities/chat';
import { messageProxy, messageApi, MessagesListView, useMessageStore, messageTypes } from 'entities/message';
import { viewerService } from 'entities/viewer';
import { useRouter } from 'shared/hooks';

import { MessageProxy } from '../../../entities/message/model/types';

type Props = {};

function MessageList(props: Props) {
    const { params } = useRouter();

    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleReadMessage } = messageApi.handleReadMessage();

    const {
        data: messageData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
        isFetching,
    } = messageApi.handleGetMessages({ chatId, initialPage: chatService.getInitialPage(chatData) });

    const getPrevPage = () => {
        hasPreviousPage && !isFetching && fetchPreviousPage().then();
    };

    const getNextPage = () => {
        hasNextPage && !isFetching && fetchNextPage().then();
    };

    const hoverMessage = (messages: MessageProxy) => {
        if (!messages.is_read && messages.type !== 'system') {
            handleReadMessage({ chat_id: chatId, message_id: messages.id });
        }
    };

    return (
        <>
            <MessagesListView
                chat={chatData}
                messages={messageData?.pages.map((message: any, index: number) => messageProxy(messageData?.pages[index - 1], message))}
                getNextPage={getNextPage}
                getPrevPage={getPrevPage}
                hoverMessage={hoverMessage}
            />
        </>
    );
}

export default MessageList;
