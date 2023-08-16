import React from 'react';

import { sizeConverter } from 'shared/lib';

import styles from './styles.module.scss';
import Button from '../../../../button';
import Icons from '../../../../icons';
import { VoiceAudioPlayerProps } from '../../types';
import waveformStatic from '../wave-form/static';

function VoiceAudioPlayer(props: VoiceAudioPlayerProps) {
    const { url, size, isVisibleMeta } = props;

    const [waveform, waveSurferRef, isPlaying, time, currentTime] = waveformStatic({ url });

    const playPauseClick = () => {
        if (typeof waveSurferRef.current.playPause === 'function') {
            waveSurferRef.current.playPause();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.controls}>
                <Button.Circle radius={40} onClick={playPauseClick}>
                    <Icons.Player variant={isPlaying ? 'pause' : 'play'} />
                </Button.Circle>
            </div>
            {isVisibleMeta && (
                <>
                    <div className={styles.time}>
                        {time.currentSec && (
                            <div className={styles.currentTime}>{`${currentTime.h ? `${currentTime.h}:` : ''}${currentTime.m}:${currentTime.s}`}</div>
                        )}
                        {time.currentSec && <div>/</div>}
                        <div className={styles.totalTime}>{`${time.h ? `${time.h}:` : ''}${time.m}:${time.s}`}</div>
                    </div>
                    <div className={styles.size}>{size && sizeConverter(size)}</div>
                </>
            )}
            <div className={styles.waveform}>{waveform}</div>
        </div>
    );
}

export default VoiceAudioPlayer;
