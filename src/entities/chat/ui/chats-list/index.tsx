import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Card, Collapse, Title, Counter, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';

type Props = {
    chats: ChatProxy[];
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
    createChat: (value: string) => void;
} & BaseTypes.Statuses;

function ChatListView(props: Props) {
    const { chats, clickOnChat, loading, createChat, activeChatId } = props;

    const data = [
        { id: 0, name: 'Личные чаты', items: chats.filter((i) => !i.is_group) },
        { id: 1, name: 'Групповые чаты', items: chats.filter((i) => i.is_group) },
        { id: 2, name: 'Каналы', items: [] },
    ];

    return (
        <Box loading={loading} className={styles.wrapper}>
            {chats &&
                data.map((category, index: number) => (
                    <Collapse
                        createAction={category.name !== 'Каналы' ? createChat : undefined}
                        isOpen={index === 0}
                        key={category.id}
                        titleClassName={styles.categoryTitle}
                        headerClassName={styles.headerCollapse}
                        title={category.name}
                    >
                        <div className={styles.chatsList}>
                            {category.items.map((chat) => (
                                <div key={chat.id} className={styles.item} onClick={() => clickOnChat(chat)}>
                                    <Card img={chat.avatar} title={chat.name} subtitle={chat.lastMessageTitle} />
                                    <div className={styles.rightColumn}>
                                        <Title variant="caption1S" primary={false}>
                                            {chat.date}
                                        </Title>
                                        <div className={styles.checked}>
                                            {chat.pending_messages_count ? (
                                                <Counter height={18}>{chat.pending_messages_count}</Counter>
                                            ) : (
                                                chat.checkIsMyLastMessage && <Icons variants={chat.last_message?.is_read ? 'doubleCheck' : 'check'} />
                                            )}
                                        </div>
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
