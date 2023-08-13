import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Icons, Card, Button, TabBarTypes, TabBar } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    back: () => void;
    tabs: TabBarTypes.TabBarItem[];
    clickCard: () => void;
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { chat, back, tabs, clickCard } = props;

    return (
        <div className={styles.wrapper}>
            {useWidthMediaQuery().to('sm') && (
                <Button.Circle onClick={back} variant="secondary">
                    <Icons variant="arrow-left" />
                </Button.Circle>
            )}
            <div className={styles.left}>
                <Card
                    onClick={clickCard}
                    avatarStatus={chat?.secondMemberStatus || null}
                    img={chat?.avatar}
                    name={chat?.name}
                    title={chat?.name}
                    subtitle={chat?.subtitle}
                />
            </div>
            <div>
                <TabBar variant="icons" items={tabs} activeItemId={0} />
            </div>
        </div>
    );
}

export default ChatHeaderView;
