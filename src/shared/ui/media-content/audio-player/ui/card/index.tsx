import React from 'react';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../lib';
import Title from '../../../../title';
import { AudioCardProps } from '../../types';
import AudioPlayer from '../base';

function AudioCard(props: AudioCardProps) {
    const { disabled, url, size, name } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <AudioPlayer disabled={disabled} url={url} btnRadius={34} visibleWave={false} />
            </div>
            <div className={styles.caption}>
                <Title variant="H3M">{name}</Title>
                <Title variant="H4M">{sizeConverter(size)}</Title>
            </div>
        </div>
    );
}
export default AudioCard;
