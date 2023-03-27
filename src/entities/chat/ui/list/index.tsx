import React, { Fragment, useState } from 'react';

import { useSelected } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Box, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { Chat } from '../../model/types';
import ChatCardView from '../card';

type Props = {
    chats: Chat[];
    clickOnChat: (arg: Chat) => void;
} & baseTypes.Statuses;

function ChatListView(props: Props) {
    const { chats, clickOnChat, loading, error } = props;

    const data = [
        { id: 0, name: 'Личные чаты', items: chats },
        { id: 1, name: 'Групповые чаты', items: chats },
        { id: 2, name: 'Каналы', items: chats },
    ];

    return (
        <Box loading={loading} className={styles.wrapper}>
            {chats &&
                data.map((category, index: number) => (
                    <Collapse key={category.id} titleClassName={styles.categoryTitle} title={category.name}>
                        <div className={styles.chatsList}>
                            {category.items.map((chat) => (
                                <ChatCardView key={chat.id} chat={chat} />
                            ))}
                        </div>
                    </Collapse>
                ))}
        </Box>
    );
}

export default ChatListView;
