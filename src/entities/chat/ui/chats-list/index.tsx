import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';

type Props = {
    chats: ChatProxy[];
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
} & BaseTypes.Statuses;

function ChatsListView(props: Props) {
    const { chats, clickOnChat, loading, activeChatId } = props;

    return (
        <Box loading={loading} className={styles.wrapper}>
            <div className={styles.list}>
                {chats.map((chat, index: number) => (
                    <div key={chat.id} className={`${styles.item} ${activeChatId === chat.id ? styles.item_active : ''}`} onClick={() => clickOnChat(chat)}>
                        <div className={styles.body}>
                            <div className={styles.avatar}>
                                <Avatar size={52} img={chat.avatar} name={chat.name} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.top}>
                                    <div className={styles.left}>
                                        <Title variant="H3S">{chat.name}</Title>
                                        <Button tag>TFN</Button>
                                    </div>
                                    <div className={styles.right}>
                                        <Title textAlign="right" variant="caption1M" primary={false}>
                                            {chat.date}
                                        </Title>
                                    </div>
                                </div>
                                <div className={styles.bottom}>
                                    <div className={styles.left}>
                                        <Title primary={false} variant="H3R">
                                            {chat.lastMessageTitle}
                                        </Title>
                                    </div>
                                    <div className={styles.right}>
                                        {chat.pending_messages_count ? (
                                            <Counter height={18}>{chat.pending_messages_count}</Counter>
                                        ) : (
                                            chat.checkIsMyLastMessage && <Icons variant={chat.last_message?.is_read ? 'double-check' : 'check'} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Box>
    );
}

export default ChatsListView;
