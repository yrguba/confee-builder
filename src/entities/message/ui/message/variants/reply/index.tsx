import React from 'react';

import { BaseTypes } from 'shared/types';
import { Title } from 'shared/ui';

import styles from './styles.module.scss';
import MessageService from '../../../../lib/service';
import { Message, MessageProxy } from '../../../../model/types';

type Props = {
    message: Message | null;
} & BaseTypes.Statuses;

function ReplyMessage(props: Props) {
    const { message } = props;
    const authorName = MessageService.getAuthorName(message);

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Title active variant="H4S">
                    {authorName}
                </Title>
                <Title variant="H4M">{message?.text}</Title>
            </div>
        </div>
    );
}

export default ReplyMessage;
