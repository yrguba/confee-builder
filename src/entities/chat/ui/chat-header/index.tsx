import moment from 'moment';
import React from 'react';

import { ViewerService } from 'entities/viewer';
import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Counter, Icons, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../message/model/types';
import { ChatProxy, Chat } from '../../model/types';

type Props = {
    chat: Chat | BaseTypes.Empty;
    clickChatCard: () => void;
    back: () => void;
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { chat, clickChatCard, back } = props;

    return (
        <div className={styles.wrapper}>
            <div onClick={back}>
                <Icons variants="leftArrow" />
            </div>
            <Card img={chat?.avatar} title={chat?.name} subtitle="ddd" onClick={clickChatCard} />
        </div>
    );
}

export default ChatHeaderView;
