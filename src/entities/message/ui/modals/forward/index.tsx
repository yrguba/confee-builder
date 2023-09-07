import React, { useEffect, useState } from 'react';

import { ChatProxy, UseChatsTabsAndListsReturnType } from 'entities/chat/model/types';
import { BaseTypes } from 'shared/types';
import { Button, Card, Input, TabBar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useInView } from '../../../../../shared/hooks';

type Props = {
    tabsAndLists: UseChatsTabsAndListsReturnType;
    clickOnChat: (arg: ChatProxy) => void;
    back: () => void;
} & BaseTypes.Statuses;

function ForwardMessagesModalView(props: Props) {
    const { back, tabsAndLists, clickOnChat } = props;

    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPage();
    }, [inViewLastItem]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Переслать...</Title>
                <div className={styles.search}>
                    <Input width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
            </div>
            <div className={styles.tabs}>
                {tabsAndLists.activeList?.length ? (
                    <TabBar items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} clickTab={(tab) => tabsAndLists.setActiveTab(tab)} />
                ) : (
                    <Title variant="H2">Нет чатов</Title>
                )}
            </div>
            <div className={styles.body}>
                <div className={styles.list}>
                    {tabsAndLists.activeList?.length &&
                        tabsAndLists.activeList?.map((chat) => (
                            <Card onClick={() => clickOnChat(chat)} key={chat?.id} title={chat.name || ''} subtitle={chat.subtitle || ''} />
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
