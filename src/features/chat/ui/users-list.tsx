import React from 'react';
import { useParams } from 'react-router';

import { ChatUsersListView, ChatApi } from 'entities/chat';
import { http } from 'shared/constanst';

type Props = {};

function ChatUsersList(props: Props) {
    const params = useParams();

    if (!params.chat_id) return null;

    const { data } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });
    return <ChatUsersListView users={data?.data?.data.chatUsers || []} />;
}

export default ChatUsersList;
