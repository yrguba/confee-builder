import React from 'react';

import { MessageStoreTypes } from 'entities/message';
import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Icons, Card, Button, TabBarTypes, TabBar, Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../shared/lib';
import { MessageProxy } from '../../../message/model/types';
import { ChatProxy, ChatTabsActions } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    back: () => void;
    clickCard: () => void;
    highlightedMessages: MessageStoreTypes['highlightedMessages'];
    clickDeleteMessages: () => void;
    clickForwardMessages: () => void;
    tabsActions: (action: ChatTabsActions) => void;
    clickActiveCallList: () => void;
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { clickActiveCallList, tabsActions, chat, back, clickCard, highlightedMessages, clickDeleteMessages, clickForwardMessages, loading } = props;

    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, icon: 'search', callback: () => tabsActions('search') },
        { id: 2, icon: chat?.meetId ? 'videocam-pulse' : 'videocam-outlined', callback: () => tabsActions('goMeet'), hidden: chat?.isDeleted },
    ];

    return (
        <Box.Replace
            className={styles.wrapper}
            items={[
                {
                    item: (
                        <div className={styles.highlightedMessages}>
                            <div className={styles.btns}>
                                <div onClick={clickForwardMessages}>
                                    <Title active variant="H3S">
                                        Переслать
                                    </Title>
                                </div>
                                <div onClick={clickDeleteMessages}>
                                    <Title color="red" variant="H3S">
                                        Удалить
                                    </Title>
                                </div>
                            </div>
                            <div className={styles.text}>
                                <Title variant="H3S" textAlign="center">
                                    {`Выбрано ${highlightedMessages.value.length} ${getEnding(highlightedMessages.value.length, [
                                        'сообщение',
                                        'сообщения',
                                        'сообщений',
                                    ])}`}
                                </Title>
                            </div>
                            <div className={styles.cancel} onClick={highlightedMessages.clear}>
                                <Title active variant="H3S">
                                    Отмена
                                </Title>
                            </div>
                        </div>
                    ),
                    visible: !!highlightedMessages.value?.length,
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
                            {/* {chat?.is_group && !!chat?.calls?.length && ( */}
                            {/*    <div className={styles.calls} onClick={clickActiveCallList}> */}
                            {/*        <Icons.CallAnimated size={40} activeAnimate /> */}
                            {/*    </div> */}
                            {/* )} */}
                        </div>
                    ),
                    visible: !highlightedMessages.value?.length,
                },
            ]}
        />
    );
}

export default ChatHeaderView;
