import React from 'react';

import { BaseTypes } from 'shared/types';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import { chatService, chatTypes } from '../../../../../chat';
import { File, MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
    message: MessageProxy;
    visibleInfoBlock?: boolean;
} & BaseTypes.Statuses;

function VoiceMessage(props: Props) {
    const { visibleInfoBlock, message, chat } = props;

    const voices = message.files.length ? message.files : message.forwarded_from_message?.files || [];
    const voice = voices[0];

    return (
        <div className={styles.wrapper}>
            <div className={styles.audio}>
                <Audio.Voice
                    date={voice.created_at}
                    url={voice.url}
                    authorName={chatService.getMemberNameByUserId(chat, voice.user_id)}
                    name={voice.name}
                    id={voice.id}
                />
            </div>
            {visibleInfoBlock && (
                <Info
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read}
                />
            )}
        </div>
    );
}

export default VoiceMessage;
