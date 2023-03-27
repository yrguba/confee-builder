import React from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Massage } from '../../model/types';
import TextMessageView from '../message/text';

type Props = {
    messages: Massage[];
    getPage: (arg: 'prev' | 'next') => void;
} & baseTypes.Statuses;

function MessagesListView(props: Props) {
    const { messages, getPage } = props;

    return (
        <div className={styles.wrapper}>
            {messages.map((message) => (
                <div key={message.id} className={styles.messageWrapper}>
                    <div className={styles.messageContent}>
                        <TextMessageView message={message} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessagesListView;
