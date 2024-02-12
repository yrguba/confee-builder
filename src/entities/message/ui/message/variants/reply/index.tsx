import React from 'react';

import { BaseTypes } from 'shared/types';
import { Document, Image, Title, TitleTypes, Video } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../../../shared/lib';
import { chatTypes } from '../../../../../chat';
import { EmployeeProxy } from '../../../../../company/model/types';
import { UserProxy } from '../../../../../user/model/types';
import { MessageProxy } from '../../../../model/types';
import Info from '../../info';
import AudioMessage from '../audio';
import DocumentsMessage from '../documents';
import ImagesMessage from '../images';
import TextMessage from '../text';
import VideoMessage from '../video';
import VoiceMessage from '../voice';

type Props = {
    message: MessageProxy;
    nameTitleVariant: TitleTypes.TitleVariants;
    messageWrapperWidth: number;
    clickMessageReply: (message: MessageProxy) => void;
    openChatProfileModal: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function ReplyMessage(props: Props) {
    const { chat, openChatProfileModal, clickMessageReply, messageWrapperWidth, nameTitleVariant, message } = props;

    const fileLength = message.reply_to_message?.files.length || 0;
    const firstFile = message.reply_to_message?.files[0] || null;

    const { reply_to_message, replyProxy } = message;

    return (
        <div className={styles.wrapper} onClick={() => replyProxy && clickMessageReply(replyProxy)}>
            <div className={styles.description}>
                <div className={styles.content}>
                    <Title active variant={nameTitleVariant}>
                        {replyProxy?.authorName}
                    </Title>
                    {reply_to_message?.type === 'text' && <Title variant="H4M">{reply_to_message?.text}</Title>}
                    {reply_to_message?.type === 'images' && (
                        <Title variant="H4M">{firstFile?.url ? `${fileLength > 1 ? fileLength : ''} фото` : 'удалено'}</Title>
                    )}
                    {reply_to_message?.type === 'videos' && (
                        <Title variant="H4M">{firstFile?.url ? `${fileLength > 1 ? fileLength : ''} видео` : 'удалено'}</Title>
                    )}
                    {reply_to_message?.type === 'documents' && (
                        <Title variant="H4M">
                            {firstFile?.url ? `${fileLength > 1 ? fileLength : ''} ${getEnding(fileLength, ['файл', 'файла', 'файлов'])}` : 'удалено'}
                        </Title>
                    )}
                    {reply_to_message?.type === 'voices' && <Title variant="H4M">голосовое сообщение</Title>}
                    {reply_to_message?.type === 'audios' && <Title variant="H4M">аудио</Title>}
                </div>
            </div>
            <div className={styles.body}>
                {reply_to_message?.text === 'Сообщение удалено' ? (
                    <div className={styles.deleted}>
                        <Title variant="H4M">Сообщение удалено</Title>
                    </div>
                ) : (
                    <>
                        {message?.type === 'text' && <TextMessage message={message} openChatProfileModal={openChatProfileModal} chat={chat} />}
                        {message?.type === 'images' && <ImagesMessage message={message} />}
                        {message?.type === 'documents' && <DocumentsMessage message={message} />}
                        {message?.type === 'voices' && <VoiceMessage message={message} chat={chat} />}
                        {message?.type === 'audios' && <AudioMessage message={message} chat={chat} />}
                        {message?.type === 'videos' && <VideoMessage message={message} />}
                    </>
                )}
            </div>
            <div className={styles.info}>
                <Info
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read}
                />
            </div>
        </div>
    );
}

export default ReplyMessage;
