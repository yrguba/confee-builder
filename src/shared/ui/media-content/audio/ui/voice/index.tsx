import React, { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { useMessageStore } from 'entities/message';
import { useEasyState, useFetchMediaContent, useFs, useGlobalAudioPlayer, useRouter } from 'shared/hooks';

import styles from './styles.module.scss';
import { Audio, Box, Button, Icons, LoadingIndicator, Notification } from '../../../..';
import { getRandomString } from '../../../../../lib';
import momentLocalZone from '../../../../../lib/moment-local-zone';
import useAudioStore from '../../store';
import { VoiceProps } from '../../types';
import waveformStatic from '../wave-form/static';

function Voice(props: VoiceProps) {
    const { date, id, name, disabled, url, authorName } = props;

    const fs = useFs();

    const { src, getFileBlob } = useFetchMediaContent({ url, name, fileType: 'audio' });

    const downloadFile = useMessageStore.use.downloadFile();

    const notification = Notification.use();
    const [waveform, waveSurferRef, isPlaying, time, currentTime, isLoading] = waveformStatic({ url: src || ' ' });

    const progress = useEasyState(0);

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const { load, play, pause, playing, isReady, src: playerSrc, togglePlayPause } = useGlobalAudioPlayer();

    const playPauseClick = () => {
        if (currentlyPlaying.value.apiUrl === url) {
            togglePlayPause();
        } else {
            currentlyPlaying.set({
                id: url,
                apiUrl: url,
                src,
                name,
                authorName,
                description: date ? momentLocalZone(date).format('Do MMMM, HH:mm') : '',
            });
            load(src, {
                format: 'mp3',
                autoplay: true,
            });
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
                    <Icons.Player variant={playing && currentlyPlaying.value.apiUrl === url ? 'pause' : 'play'} />
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
