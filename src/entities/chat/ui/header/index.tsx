import React from 'react';

import { useWidthMediaQuery, UseStoreTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Icons, Card, Button, TabBarTypes, TabBar, Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../message/model/types';
import { ChatProxy, ChatTabsActions } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    back: () => void;
    clickCard: () => void;
    highlightedMessages: UseStoreTypes.SelectorWithArr<MessageProxy>;
    clickDeleteMessages: () => void;
    clickForwardMessages: () => void;
    tabsActions: (action: ChatTabsActions) => void;
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { tabsActions, chat, back, clickCard, highlightedMessages, clickDeleteMessages, clickForwardMessages, loading } = props;

    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, icon: 'search', callback: () => tabsActions('search') },
        // { id: 1, icon: 'phone', callback: clickChatAudioCall },
        { id: 2, icon: chat?.meetId ? 'videocam-pulse' : 'videocam-outlined', callback: () => tabsActions('goMeet') },
    ];
    return (
        <Box.Replace
            className={styles.wrapper}
            items={[
                {
                    item: (
                        <div className={styles.highlightedMessages}>
                            <div className={styles.btns}>
                                <Button onClick={clickForwardMessages}>Переслать {highlightedMessages.value.length}</Button>
                                <Button onClick={clickDeleteMessages}>Удалить {highlightedMessages.value.length}</Button>
                            </div>
                            <div className={styles.cancel} onClick={highlightedMessages.clear}>
                                <Title active variant="H2">
                                    Отмена
                                </Title>
                            </div>
                        </div>
                    ),
                    visible: !!highlightedMessages.value.length,
                },
                {
                    item: (
                        <div className={styles.main}>
                            {useWidthMediaQuery().to('md') && (
                                <Button.Circle onClick={back} variant="secondary">
                                    <Icons variant="arrow-left" />
                                </Button.Circle>
                            )}
                            <div className={styles.left}>
                                <Card
                                    onClick={clickCard}
                                    avatarNetworkStatus={chat?.secondUser?.networkStatus}
                                    // avatarEmployeeStatuses={chat?.secondEmployee?.status}
                                    img={chat?.avatar}
                                    name={chat?.name}
                                    title={chat?.name}
                                    subtitle={chat?.subtitle}
                                    loading={loading}
                                    size="l"
                                    companyNames={chat?.is_personal ? [] : ['TFN']}
                                />
                            </div>
                            <div>
                                <TabBar variant="icons" items={tabs} activeItemId={0} />
                            </div>
                        </div>
                    ),
                    visible: !highlightedMessages.value.length,
                },
            ]}
        />
    );
}

export default ChatHeaderView;
