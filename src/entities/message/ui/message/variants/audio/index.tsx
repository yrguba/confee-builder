import React from 'react';

import { BaseTypes } from 'shared/types';
import { Audio } from 'shared/ui';

import styles from './styles.module.scss';
import { chatTypes } from '../../../../../chat';
import { File } from '../../../../model/types';

type Props = {
    audios: File[];
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function AudioMessage(props: Props) {
    const { chat, audios } = props;
    const audio = audios[0];
    return (
        <div className={styles.wrapper}>
            <Audio url={audio.url} name={audio.name} authorName={audio.name} description="неизвестно" />
        </div>
    );
}

export default AudioMessage;
