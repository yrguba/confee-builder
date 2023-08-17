import React, { useState } from 'react';

import { ChatProxy } from 'entities/chat/model/types';
import { BaseTypes } from 'shared/types';
import { Button, Card, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    chats: ChatProxy[] | BaseTypes.Empty;
    clickChat: (chatId: number) => void;
    back: () => void;
} & BaseTypes.Statuses;

function ForwardMessagesModalView(props: Props) {
    const { back, chats, clickChat } = props;

    const [activeTab, setActiveTab] = useState(0);
    const btns = [{ id: 0, title: 'Все', onClick: () => setActiveTab(0) }];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Переслать...</Title>
                <div className={styles.search}>
                    <Input width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.nav}>
                    {btns.map((btn) => (
                        <Button key={btn.id} chips variant={btn.id === activeTab ? 'primary' : 'secondary'} onClick={btn.onClick}>
                            {btn.title}
                        </Button>
                    ))}
                </div>
                <div className={styles.list}>
                    {chats?.map((chat) => (
                        <Card onClick={() => clickChat(chat.id)} key={chat?.id} title={chat.name || ''} subtitle={chat.subtitle || ''} />
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <Button onClick={back} variant="secondary">
                    Отмена
                </Button>
            </div>
        </div>
    );
}

export default ForwardMessagesModalView;
