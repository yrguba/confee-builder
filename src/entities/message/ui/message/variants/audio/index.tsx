import React from 'react';

import { BaseTypes } from 'shared/types';

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
            audio
            {/* <AudioPlayer url={audio.url} name={audio.name} isVisibleMeta /> */}
        </div>
    );
}

export default AudioMessage;
