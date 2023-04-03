import { useQueryClient } from '@tanstack/react-query';
import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useChatStore } from 'entities/chat';
import { MessageApi, MessagesListView, useMessageStore, MessageTypes } from 'entities/message';
import { useToggle, useReverseTimer, useInView } from 'shared/hooks';

import { Button } from '../../../shared/ui';

type Props = {};

function MessageList(props: Props) {
    // const { children } = props;

    const [prevY, setPrevY] = useState<number | null>(null);

    const params = useParams();
    const initialPage = useChatStore.use.initialPage();

    const [_, render] = useToggle();

    const { data, hasNextPage, hasPreviousPage, fetchPreviousPage, fetchNextPage, isLoading, isFetching } = MessageApi.handleGetMessages({
        chatId: params.chat_id,
        page: initialPage,
    });

    const { isRunning, time, reset, start } = useReverseTimer({ seconds: 1 });

    MessageApi.subscriptions((action: string) => {
        render();
    });

    const handleScroll = ({ currentTarget }: UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = currentTarget;

        if (prevY) {
            if (scrollTop < prevY) {
                if (!isFetching && hasNextPage && scrollHeight + (scrollTop - clientHeight) < 200) {
                    currentTarget.style.flexDirection = 'column-reverse';
                    fetchNextPage().then();
                }
            } else if (!isFetching && hasNextPage && scrollHeight - (scrollTop + clientHeight) < 200) {
                currentTarget.style.flexDirection = 'column';
                fetchNextPage().then();
            }
        } else {
            currentTarget.style.flexDirection = 'column-reverse';
        }

        setPrevY(scrollTop);
    };

    const reactionClick = (emoji: any) => {
        console.log(emoji);
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

    return (
        <MessagesListView
            pages={data?.pages.map((page) => page.data.data)}
            handleScroll={handleScroll}
            textMessageMenuItems={items}
            reactionClick={reactionClick}
        />
    );
}

export default MessageList;
