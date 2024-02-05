import React from 'react';

import { BaseTypes } from 'shared/types';
import { Audio } from 'shared/ui';

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
            <Audio.Voice url={voice.url} name={voice.name} id={voice.id} isVisibleMeta />
        </div>
    );
}

export default VoiceMessage;
