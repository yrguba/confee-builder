import React, { useState } from 'react';

import { ChatProxy } from 'entities/chat/model/types';
import { BaseTypes } from 'shared/types';
import { Button, Card, Input, TabBar, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    chats: ChatProxy[] | BaseTypes.Empty;
    clickChat: (chatId: number) => void;
    back: () => void;
} & BaseTypes.Statuses;

function ForwardMessagesModalView(props: Props) {
    const { back, chats, clickChat } = props;

    const [activeTab, setActiveTab] = useState(0);
    const btns = [{ id: 0, title: 'Все', callback: () => setActiveTab(0) }];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Переслать...</Title>
                <div className={styles.search}>
                    <Input width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
            </div>
            <TabBar bodyStyle={{ padding: '0 22px' }} items={btns} activeItemId={activeTab} />
            <div className={styles.body}>
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
