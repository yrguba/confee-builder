import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button, Input, TabBar, TabBarTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { UseArrayReturnType, useHeightMediaQuery, useInView } from '../../../../shared/hooks';
import { Actions, ChatProxy, UseChatsTabsAndListsReturnType } from '../../model/types';
import ChatCardView from '../card';

type Props = {
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
    tabsAndLists: UseChatsTabsAndListsReturnType;
    chatMenuAction: (action: Actions, chat: ChatProxy) => void;
} & BaseTypes.Statuses;

function ChatsListView(props: Props) {
    const { clickOnChat, loading, activeChatId, tabsAndLists, chatMenuAction } = props;
    const miniSearch = useHeightMediaQuery().to('sm');

    const wrapperRef = useRef(null);
    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPage();
    }, [inViewLastItem]);

    return (
        <Box loading={loading} className={styles.wrapper}>
            {!miniSearch && (
                <div className={styles.search}>
                    <Input prefixIcon="search" />
                </div>
            )}
            <div className={styles.tabs}>
                <TabBar items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} clickTab={(tab) => tabsAndLists.setActiveTab(tab)} />
            </div>
            <Box.Animated trigger={String(tabsAndLists.activeTab?.id)} visible={!!tabsAndLists.activeList?.length} className={styles.list} ref={wrapperRef}>
                {tabsAndLists.activeList?.map((chat, index: number) => (
                    <ChatCardView
                        chatMenuAction={chatMenuAction}
                        key={chat.id}
                        chat={chat}
                        clickOnChat={clickOnChat}
                        active={activeChatId === chat?.id}
                        ref={{
                            // @ts-ignore
                            lastChat: index + 1 === tabsAndLists.activeList?.length ? lastItem : null,
                            wrapper: wrapperRef,
                        }}
                    />
                ))}
            </Box.Animated>
        </Box>
    );
}

export default ChatsListView;
