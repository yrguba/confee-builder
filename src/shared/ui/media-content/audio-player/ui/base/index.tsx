import React, { useEffect } from 'react';

import { sizeConverter } from 'shared/lib';

import styles from './styles.module.scss';
import { appTypes } from '../../../../../../entities/app';
import { useFetchMediaContent, useStorage } from '../../../../../hooks';
import Box from '../../../../box';
import Button from '../../../../button';
import Icons from '../../../../icons';
import LoadingIndicator from '../../../../loading-indicator';
import { BaseAudioPlayerProps } from '../../types';
import waveformStatic from '../wave-form/static';

function AudioPlayer(props: BaseAudioPlayerProps) {
    const { name, clickedFile, disabled, url, size, isVisibleMeta, btnRadius = 40, visibleWave = true } = props;
    const storage = useStorage();
    const { src, fileBlob } = useFetchMediaContent(url || '', storage.get('save_in_cache'));

    const [waveform, waveSurferRef, isPlaying, time, currentTime, isLoading] = waveformStatic({ url: src || ' ' });

    const playPauseClick = () => {
        if (!disabled && typeof waveSurferRef.current.playPause === 'function') {
            waveSurferRef.current.playPause();
        }
    };

    return (
        <div
            onContextMenu={() => fileBlob && name && clickedFile?.set({ blob: fileBlob, name, type: 'audios' })}
            className={styles.wrapper}
            style={{ overflow: isLoading ? 'hidden' : 'visible' }}
        >
            <LoadingIndicator.Glare visible={isLoading} />
            <div className={styles.controls}>
                <Button.Circle radius={btnRadius} onClick={playPauseClick}>
                    <Icons.Player variant={isPlaying ? 'pause' : 'play'} />
                </Button.Circle>
            </div>
            {isVisibleMeta && !isLoading && (
                <>
                    <div className={styles.time}>
                        <Box.Animated visible={!!time.currentSec} animationVariant="autoWidth">
                            <div className={styles.currentTime}>{`${currentTime.h ? `${currentTime.h}:` : ''}${currentTime.m}:${currentTime.s}`}</div>
                        </Box.Animated>
                        {time.currentSec && <div>/</div>}
                        <div className={styles.totalTime}>{`${time.h ? `${time.h}:` : ''}${time.m}:${time.s}`}</div>
                    </div>
                    {size && <div className={styles.size}>{size && sizeConverter(size)}</div>}
                </>
            )}
            <div style={{ display: visibleWave ? '' : 'none' }} className={styles.waveform}>
                {waveform}
            </div>
        </div>
    );
}

export default AudioPlayer;
