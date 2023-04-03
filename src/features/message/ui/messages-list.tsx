import { useQueryClient } from '@tanstack/react-query';
import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useChatStore } from 'entities/chat';
import { MessageApi, MessagesListView, useMessageStore, MessageTypes } from 'entities/message';
import { useToggle, useReverseTimer, useInView } from 'shared/hooks';
import { reactionConverter } from 'shared/lib';

import { Button } from '../../../shared/ui';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;

    const [prevY, setPrevY] = useState<number | null>(null);
    const initialPage = useChatStore.use.initialPage();
    const params = useParams();

    const [_, render] = useToggle();

    MessageApi.subscriptions((action: string) => {
        console.log(action);
        render();
    });

    const { data, hasNextPage, hasPreviousPage, fetchPreviousPage, fetchNextPage, isLoading, isFetching } = MessageApi.handleGetMessages({
        chatId: params.chat_id,
        page: initialPage,
    });

    const { mutate: handleSendReaction } = MessageApi.handleSendReaction();

    // const { isRunning, start } = useReverseTimer({ seconds: 1 });

    const handleScroll = ({ currentTarget }: UIEvent<HTMLDivElement>) => {
        // const { scrollTop, scrollHeight, clientHeight } = currentTarget;
        //
        // if (prevY && scrollTop < prevY) {
        //     // currentTarget.style.flexDirection = 'column-reverse';
        //
        //     if (!isFetching && hasNextPage && scrollHeight + (scrollTop - clientHeight) < 200) {
        //         // fetchNextPage().then();
        //     }
        // } else if (!isFetching && hasPreviousPage && scrollHeight - (scrollTop + clientHeight) < 200) {
        //     // currentTarget.style.flexDirection = 'column';
        //     // fetchPreviousPage().then();
        // }
        //
        // setPrevY(scrollTop);
    };

    const reactionClick = (messageId: number, reaction: any) => {
        handleSendReaction({ chatId: Number(params.chat_id), messageId, reaction: reactionConverter(reaction, 'html') });
    };

    const items: MessageTypes.MessageMenuItem[] = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer' },
        { id: 1, title: 'Переслать сообщение', icon: 'forward' },
        { id: 2, title: 'Скопировать текст', icon: 'copy' },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit' },
        { id: 4, title: 'Удалить сообщение', icon: 'delete' },
        { id: 5, title: 'Упомянуть автора', icon: 'mention' },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert' },
    ];

    return <MessagesListView pages={data?.pages} handleScroll={handleScroll} textMessageMenuItems={items} reactionClick={reactionClick} />;
}

export default MessageList;
