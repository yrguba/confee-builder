import React from 'react';

import { BaseTypes } from 'shared/types';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import { chatService, chatTypes } from '../../../../../chat';
import { File } from '../../../../model/types';

type Props = {
    voices: File[];
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function VoiceMessage(props: Props) {
    const { chat, voices } = props;
    const voice = voices[0];

    return (
        <div className={styles.wrapper}>
            <Audio.Voice
                date={voice.created_at}
                url={voice.url}
                authorName={chatService.getMemberNameByUserId(chat, voice.user_id)}
                name={voice.name}
                id={voice.id}
            />
        </div>
    );
}

export default VoiceMessage;
