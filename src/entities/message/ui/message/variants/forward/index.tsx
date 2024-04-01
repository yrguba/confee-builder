import React from 'react';

import { BaseTypes } from 'shared/types';
import { Title, TitleTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../../../chat/model/types';
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
    openChatProfileModal: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    chat: ChatProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function ForwardMessage(props: Props) {
    const { chat, openChatProfileModal, nameTitleVariant, message } = props;

    const { forwarded_from_message } = message;

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.description}>
                    <Title textAlign="left" active variant={nameTitleVariant}>
                        {`Переслано от ${message.proxy_forwarded_from_message?.authorName}`}
                    </Title>
                </div>
                <div className={styles.body}>
                    {forwarded_from_message?.text === 'Сообщение удалено' ? (
                        <div className={styles.deleted}>
                            <Title variant="H4M">Сообщение удалено</Title>
                        </div>
                    ) : (
                        <>
                            {forwarded_from_message?.type === 'text' && (
                                <TextMessage message={message} openChatProfileModal={openChatProfileModal} chat={chat} />
                            )}
                            {forwarded_from_message?.type === 'images' && <ImagesMessage message={message} />}
                            {forwarded_from_message?.type === 'documents' && <DocumentsMessage message={message} />}
                            {forwarded_from_message?.type === 'voices' && <VoiceMessage message={message} chat={chat} />}
                            {forwarded_from_message?.type === 'audios' && <AudioMessage message={message} chat={chat} />}
                            {forwarded_from_message?.type === 'videos' && <VideoMessage message={message} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForwardMessage;
