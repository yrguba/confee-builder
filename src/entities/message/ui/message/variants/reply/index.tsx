import React from 'react';

import { BaseTypes } from 'shared/types';
import { Title, TitleTypes } from 'shared/ui';

import styles from './styles.module.scss';
import MessageService from '../../../../lib/service';
import { Message, MessageProxy } from '../../../../model/types';

type Props = {
    message: MessageProxy | null;
    nameTitleVariant: TitleTypes.TitleVariants;
} & BaseTypes.Statuses;

function ReplyMessage(props: Props) {
    const { nameTitleVariant, message } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Title active variant={nameTitleVariant}>
                    {message?.authorName}
                </Title>
                <Title variant="H4M">{message?.text}</Title>
            </div>
        </div>
    );
}

export default ReplyMessage;
