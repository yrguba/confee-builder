import React from 'react';

import { BaseTypes } from 'shared/types';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import { chatTypes } from '../../../../../chat';
import { File, MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
    message: MessageProxy;
    visibleInfoBlock?: boolean;
} & BaseTypes.Statuses;

function AudioMessage(props: Props) {
    const { visibleInfoBlock, message, chat } = props;

    const audios = message.files.length ? message.files : message.forwarded_from_message?.files || [];
    const audio = audios[0];

    return (
        <div className={styles.wrapper}>
            <div className={styles.audio}>
                <Audio visibleDropdown={false} url={audio.url} name={audio.name} authorName={audio.name} description="неизвестно" />
            </div>
            {visibleInfoBlock && (
                <Info
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read.length}
                />
            )}
        </div>
    );
}

export default AudioMessage;
