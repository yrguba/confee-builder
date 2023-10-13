import React, { useEffect } from 'react';

import { BaseTypes } from 'shared/types';
import { Image, Title, TitleTypes } from 'shared/ui';

import styles from './styles.module.scss';
import MessageService from '../../../../lib/service';
import { Message, MessageProxy } from '../../../../model/types';

type Props = {
    message: MessageProxy;
    nameTitleVariant: TitleTypes.TitleVariants;
    messageWrapperWidth: number;
    clickMessageReply: (message: MessageProxy) => void;
} & BaseTypes.Statuses;

function ReplyMessage(props: Props) {
    const { clickMessageReply, messageWrapperWidth, nameTitleVariant, message } = props;

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
        <div className={styles.wrapper} onClick={() => clickMessageReply(message)}>
            {/* {message?.type === 'images' && <Image width="10px" height="40px" url={message.files[0].url} />} */}
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
