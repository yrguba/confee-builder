import React, { useEffect, useRef } from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Input, TabBar } from 'shared/ui';

import styles from './styles.module.scss';
import { useHeightMediaQuery, useInView } from '../../../../shared/hooks';
import { chatProxy } from '../../index';
import { chat_gtp_id } from '../../lib/constants';
import mockChat from '../../lib/mock';
import { PrivateChatActions, GroupChatActions, ChatProxy, UseChatsTabsAndListsReturnType } from '../../model/types';
import ChatCardView from '../card';

type Props = {
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
    tabsAndLists: UseChatsTabsAndListsReturnType;
    chatMenuAction: (action: PrivateChatActions | GroupChatActions, chat: ChatProxy) => void;
} & BaseTypes.Statuses;

function ChatsListView(props: Props) {
    const { clickOnChat, loading, activeChatId, tabsAndLists, chatMenuAction } = props;
    const miniSearch = useHeightMediaQuery().to('sm');

    const wrapperRef = useRef(null);
    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    const chats = tabsAndLists.searchInput.value ? tabsAndLists.foundChats : tabsAndLists.activeList;

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPage();
    }, [inViewLastItem]);

    return (
        <Box loading={loading} className={styles.wrapper}>
            <div className={styles.search}>
                <Input {...tabsAndLists.searchInput} prefixIcon="search" clearIcon />
            </div>
            <div className={styles.tabs}>
                <TabBar items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} clickTab={(tab) => tabsAndLists.setActiveTab(tab)} />
            </div>
            <Box.Animated
                trigger={String(tabsAndLists.activeTab?.id && tabsAndLists.activeTab.title)}
                visible={!!chats?.length}
                className={styles.list}
                ref={wrapperRef}
            >
                <ChatCardView
                    chatMenuAction={chatMenuAction}
                    chat={chatProxy(mockChat({ name: 'ChatGpt', id: chat_gtp_id })) as any}
                    clickOnChat={clickOnChat}
                    active={window.location.pathname.split('/').pop() === 'chat_gpt'}
                    description="Чат с ботом"
                    ref={{
                        // @ts-ignore
                        lastChat: null,
                        wrapper: wrapperRef,
                    }}
                />
                {chats?.map((chat, index: number) => (
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
