import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Card, Collapse, Title, Counter, Icons } from 'shared/ui';

type Props = {
    // chats: ChatProxy[];
    // clickOnChat: (arg: ChatProxy) => void;
    // activeChatId: number | null;
    // createChat: (value: string) => void;
} & BaseTypes.Statuses;

function MessageListView(props: Props) {
    // const { chats, clickOnChat, loading, createChat, activeChatId } = props;

    return <div>MessageListView</div>;
}

export default MessageListView;
