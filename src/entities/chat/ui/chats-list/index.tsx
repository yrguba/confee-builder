import React from 'react';

import { MessageTypes } from 'entities/message';
import { BaseTypes } from 'shared/types';
import { Box, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';
import ChatCardView from '../card';

type Props = {
    chats: ChatProxy[];
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
} & BaseTypes.Statuses;

function ChatListView(props: Props) {
    const { chats, clickOnChat, loading, error, activeChatId } = props;

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
                        isOpen={!!(activeChatId && category.id === 0)}
                        key={category.id}
                        titleClassName={styles.categoryTitle}
                        headerClassName={styles.headerCollapse}
                        title={category.name}
                    >
                        <div className={styles.chatsList}>
                            {category.items.map((chat) => (
                                <div key={chat.id} className={`${styles.chatWrapper} ${activeChatId === chat.id ? styles.itemActive : ''}`}>
                                    <div className={styles.chatContent}>
                                        <ChatCardView
                                            showChecked
                                            showDate
                                            chat={chat}
                                            subtitle={chat.messageAction || chat.lastMessage}
                                            onClick={clickOnChat}
                                        />
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
