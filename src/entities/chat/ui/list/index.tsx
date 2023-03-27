import React from 'react';

import { baseTypes } from 'shared/types';
import { Box, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { Chat } from '../../model/types';
import ChatCardView from '../card';

type Props = {
    chats: Chat[];
    clickOnChat: (arg: Chat) => void;
    activeChatId: number | null;
} & baseTypes.Statuses;

function ChatListView(props: Props) {
    const { chats, clickOnChat, loading, error, activeChatId } = props;

    const data = [
        { id: 0, name: 'Личные чаты', items: chats },
        { id: 1, name: 'Групповые чаты', items: chats },
        { id: 2, name: 'Каналы', items: chats },
    ];

    return (
        <Box loading={loading} className={styles.wrapper}>
            {chats &&
                data.map((category, index: number) => (
                    <Collapse key={category.id} titleClassName={styles.categoryTitle} headerClassName={styles.headerCollapse} title={category.name}>
                        <div className={styles.chatsList}>
                            {category.items.map((chat) => (
                                <div key={chat.id} className={`${styles.chatWrapper} ${activeChatId === chat.id ? styles.itemActive : ''}`}>
                                    <div className={styles.chatContent}>
                                        <ChatCardView chat={chat} onClick={clickOnChat} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Collapse>
                ))}
        </Box>
    );
}

export default ChatListView;
