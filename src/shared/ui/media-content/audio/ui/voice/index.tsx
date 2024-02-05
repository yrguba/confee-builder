import React, { useEffect } from 'react';

import { useMessageStore } from 'entities/message';
import { useEasyState, useFetchMediaContent, useFs } from 'shared/hooks';

import styles from './styles.module.scss';
import { Box, Button, Icons, LoadingIndicator, Notification } from '../../../..';
import { VoiceProps } from '../../types';
import waveformStatic from '../wave-form/static';

function Voice(props: VoiceProps) {
    const { id, name, disabled, url } = props;

    const fs = useFs();

    const { src, getFileBlob } = useFetchMediaContent({ url, name, fileType: 'audio' });

    const downloadFile = useMessageStore.use.downloadFile();

    const notification = Notification.use();
    const [waveform, waveSurferRef, isPlaying, time, currentTime, isLoading] = waveformStatic({ url: src || ' ' });

    const progress = useEasyState(0);

    const playPauseClick = () => {
        if (!disabled && typeof waveSurferRef.current.playPause === 'function') {
            waveSurferRef.current.playPause();
        }
    };

    const saveFile = () => {
        if (name && url) {
            fs.save({ baseDir: 'download', url, fileName: name, progressCallback: (percent) => progress.set(percent) });
        }
    };

    const onContextMenu = () => {
        downloadFile.set({
            fileType: 'audios',
            callback: saveFile,
        });
    };

    useEffect(() => {
        if (progress.value === 100) {
            notification.success({ title: 'Аудио сохранено', system: true });
        }
    }, [progress.value]);

    return (
        <div onContextMenu={onContextMenu} className={styles.wrapper} style={{ overflow: isLoading ? 'hidden' : 'visible' }}>
            <LoadingIndicator.Glare visible={isLoading} />
            <div className={styles.controls}>
                <Button.Circle radius={50} onClick={playPauseClick}>
                    <Icons.Player variant={isPlaying ? 'pause' : 'play'} />
                </Button.Circle>
            </div>
            {!isLoading && (
                <>
                    <div className={styles.time}>
                        <Box.Animated visible={!!time.currentSec} animationVariant="autoWidth">
                            <div className={styles.currentTime}>{`${currentTime.h ? `${currentTime.h}:` : ''}${currentTime.m}:${currentTime.s}`}</div>
                        </Box.Animated>
                        {time.currentSec && <div>/</div>}
                        <div className={styles.totalTime}>{`${time.h ? `${time.h}:` : ''}${time.m}:${time.s}`}</div>
                    </div>
                </>
            )}
            <div className={styles.waveform}>{waveform}</div>
        </div>
    );
}

export default Voice;
