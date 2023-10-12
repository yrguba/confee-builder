import React, { useEffect } from 'react';

import { BaseTypes } from 'shared/types';
import { Title, TitleTypes } from 'shared/ui';

import styles from './styles.module.scss';
import MessageService from '../../../../lib/service';
import { Message, MessageProxy } from '../../../../model/types';

type Props = {
    message: MessageProxy | null;
    nameTitleVariant: TitleTypes.TitleVariants;
    messageWrapperWidth: number;
} & BaseTypes.Statuses;

function ReplyMessage(props: Props) {
    const { messageWrapperWidth, nameTitleVariant, message } = props;

    const getMinWidth = () => {
        if (message) {
            const str = message.authorName.length > message?.text.length ? message.authorName.length : message?.text.length;
            const width = str * 9;
            if (width < messageWrapperWidth - 180) {
                return width - 30;
            }
            return messageWrapperWidth - 200;
        }
        return 140;
    };

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
