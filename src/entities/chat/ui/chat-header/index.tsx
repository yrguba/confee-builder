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
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { chat } = props;

    return (
        <div className={styles.wrapper}>
            <Card img={chat?.avatar} title={chat?.name} subtitle="ddd" />
        </div>
    );
}

export default ChatHeaderView;
