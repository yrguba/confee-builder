import React, { useEffect } from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button, Input, TabBar, TabBarTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { UseArrayReturnType, useHeightMediaQuery, useInView } from '../../../../shared/hooks';
import { ChatProxy, UseChatsTabsAndListsReturnType } from '../../model/types';
import ChatCardView from '../card';

type Props = {
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
    tabsAndLists: UseChatsTabsAndListsReturnType;
} & BaseTypes.Statuses;

function ChatsListView(props: Props) {
    const { clickOnChat, loading, activeChatId, tabsAndLists } = props;
    const miniSearch = useHeightMediaQuery().to('sm');

    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPage();
    }, [inViewLastItem]);

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {!miniSearch && (
                <div className={styles.search}>
                    <Input prefixIcon="search" />
                </div>
            )}
            <div className={styles.tabs}>
                {tabsAndLists.activeList?.length ? (
                    <TabBar items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} clickTab={(tab) => tabsAndLists.setActiveTab(tab)} />
                ) : (
                    <Title variant="H2">Нет чатов</Title>
                )}
            </div>
            <div className={styles.list}>
                {tabsAndLists.activeList?.length &&
                    tabsAndLists.activeList?.map((chat, index: number) => (
                        <ChatCardView
                            key={chat.id}
                            chat={chat}
                            clickOnChat={clickOnChat}
                            active={activeChatId === chat?.id}
                            ref={index + 1 === tabsAndLists.activeList?.length ? lastItem : null}
                        />
                    ))}
            </div>
        </Box.Animated>
    );
}

export default ChatsListView;
