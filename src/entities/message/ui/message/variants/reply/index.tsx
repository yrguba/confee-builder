import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Image, Title, TitleTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { getVideoCover } from '../../../../../../shared/lib';
import { MessageProxy } from '../../../../model/types';

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

    const fileLength = message.files.length;

    return (
        <div className={styles.wrapper} onClick={() => clickMessageReply(message)}>
            {message?.type === 'images' && <Avatar circle={false} size={40} img={message.files[0].url} />}
            {/* {message.type === 'videos' && <Avatar circle={false} size={40} img={(getVideoCover(message.files[0].url) as any) || ''} />} */}
            <div className={styles.description}>
                <Title active variant={nameTitleVariant}>
                    {message?.authorName}
                </Title>
                {message.type === 'text' && <Title variant="H4M">{message?.text}</Title>}
                {message.type === 'images' && <Title variant="H4M">{`${fileLength} фото`}</Title>}
                {message.type === 'videos' && <Title variant="H4M">{`${fileLength} видео`}</Title>}
            </div>
        </div>
    );
}

export default ReplyMessage;
