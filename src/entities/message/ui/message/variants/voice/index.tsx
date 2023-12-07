import React from 'react';

import { BaseTypes } from 'shared/types';
import { AudioPlayer, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { UseEasyStateReturnType } from '../../../../../../shared/hooks';
import { File, MediaContentType } from '../../../../model/types';

type Props = {
    voices: File[];
    clickedFile: UseEasyStateReturnType<{ blob: Blob; name: string; id: number | string; type: MediaContentType } | null>;
} & BaseTypes.Statuses;

function VoiceMessage(props: Props) {
    const { clickedFile, voices } = props;
    const voice = voices[0];
    return (
        <div className={styles.wrapper}>
            <AudioPlayer clickedFile={clickedFile} url={voice.url} name={voice.name} id={voice.id} isVisibleMeta />
        </div>
    );
}

export default VoiceMessage;
