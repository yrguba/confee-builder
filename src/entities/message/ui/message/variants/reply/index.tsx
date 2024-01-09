import React from 'react';

import { BaseTypes } from 'shared/types';
import { AudioPlayer, Avatar, Document, Image, Title, TitleTypes, VideoPlayer } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding, getVideoCover } from '../../../../../../shared/lib';
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
    const firstFile = message.files[0];

    return (
        <div className={styles.wrapper} onClick={() => clickMessageReply(message)}>
            {message?.type === 'images' && <Image maxWidth="40px" height="40px" url={firstFile?.url} />}
            {message.type === 'videos' && <VideoPlayer width="40px" height="40px" visibleCover url={firstFile?.url} />}
            {message.type === 'documents' && <Document url={firstFile?.url} disableDownload />}
            <div className={styles.description}>
                <Title active variant={nameTitleVariant}>
                    {message?.authorName}
                </Title>
                {message.type === 'text' && <Title variant="H4M">{message?.text}</Title>}
                {message.type === 'images' && <Title variant="H4M">{firstFile?.url ? `${fileLength > 1 ? fileLength : ''} фото` : 'удалено'}</Title>}
                {message.type === 'videos' && <Title variant="H4M">{firstFile?.url ? `${fileLength > 1 ? fileLength : ''} видео` : 'удалено'}</Title>}
                {message.type === 'documents' && (
                    <Title variant="H4M">
                        {firstFile?.url ? `${fileLength > 1 ? fileLength : ''} ${getEnding(fileLength, ['файл', 'файла', 'файлов'])}` : 'удалено'}
                    </Title>
                )}
                {message.type === 'voices' && <Title variant="H4M">голосовое сообщение</Title>}
                {message.type === 'audios' && <Title variant="H4M">аудио</Title>}
            </div>
        </div>
    );
}

export default ReplyMessage;
