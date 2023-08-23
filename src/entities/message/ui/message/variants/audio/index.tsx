import React from 'react';

import { BaseTypes } from 'shared/types';
import { AudioPlayer, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { File } from '../../../../model/types';

type Props = {
    audios: File[];
} & BaseTypes.Statuses;

function AudioMessage(props: Props) {
    const { audios } = props;
    const voice = audios[0];
    return (
        <div className={styles.wrapper}>
            <AudioPlayer url={voice.link} isVisibleMeta />
        </div>
    );
}

export default AudioMessage;
