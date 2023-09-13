import React from 'react';

import { BaseTypes } from 'shared/types';
import { AudioPlayer, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { File } from '../../../../model/types';

type Props = {
    voices: File[];
} & BaseTypes.Statuses;

function VoiceMessage(props: Props) {
    const { voices } = props;
    const voice = voices[0];
    return (
        <div className={styles.wrapper}>
            <AudioPlayer url={voice.url} isVisibleMeta />
        </div>
    );
}

export default VoiceMessage;
