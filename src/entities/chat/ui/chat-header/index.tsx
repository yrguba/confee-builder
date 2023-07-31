import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Icons, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { Chat, ChatProxy } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    clickChatCard: () => void;
    back: () => void;
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { chat, clickChatCard, back } = props;

    return (
        <div className={styles.wrapper}>
            {useWidthMediaQuery().to('sm') && (
                <div onClick={back}>
                    <Icons variants="leftArrow" />
                </div>
            )}
            <Card img={chat?.avatar} title={chat?.name} subtitle={chat?.subtitle} onClick={clickChatCard} />
        </div>
    );
}

export default ChatHeaderView;
