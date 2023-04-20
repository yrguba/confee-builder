import React from 'react';

import styles from './styles.module.scss';
import Button from '../../../../button';
import { VoiceAudioPlayerProps } from '../../types';
import Icons from '../icons';
import waveformStatic from '../wave-form/static';

function VoiceAudioPlayer(props: VoiceAudioPlayerProps) {
    const { url, size } = props;

    const [waveform, waveSurferRef, isPlaying, time, currentTime] = waveformStatic({ url });

    const playPauseClick = () => {
        if (typeof waveSurferRef.current.playPause === 'function') {
            waveSurferRef.current.playPause();
        }
    };

    function humanFileSize(size: number) {
        const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        // @ts-ignore
        return `${(size / 1024 ** i).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.controls}>
                <Button.Circle onClick={playPauseClick}>
                    <Icons variants={isPlaying ? 'pause' : 'play'} />
                </Button.Circle>
            </div>
            <div className={styles.time}>
                {time.currentSec && <div className={styles.currentTime}>{`${currentTime.h ? `${currentTime.h}:` : ''}${currentTime.m}:${currentTime.s}`}</div>}
                {time.currentSec && <div>/</div>}
                <div className={styles.totalTime}>{`${time.h ? `${time.h}:` : ''}${time.m}:${time.s}`}</div>
            </div>
            <div className={styles.size}>{humanFileSize(size * 10485760)}</div>
            <div className={styles.waveform}>{waveform}</div>
        </div>
    );
}

export default VoiceAudioPlayer;
