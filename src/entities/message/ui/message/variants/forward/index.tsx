import React from 'react';

import { BaseTypes } from 'shared/types';
import { Title } from 'shared/ui';

import styles from './styles.module.scss';
import MessageService from '../../../../lib/service';
import { Message } from '../../../../model/types';

type Props = {
    message: Message;
} & BaseTypes.Statuses;

function ForwardMessage(props: Props) {
    const { message } = props;
    const authorName = MessageService.getAuthorName(message);
    console.log(message);
    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Title active variant="H4S">
                    {`Переслано от ${authorName || 'Неизвестно'}`}
                </Title>
                <Title variant="H4M">grg</Title>
            </div>
        </div>
    );
}

export default ForwardMessage;
