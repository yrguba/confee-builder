import React, { useEffect, useRef, useState } from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { useMessageStore } from 'entities/message';
import { useEasyState, useFetchMediaContent, useFs, useGlobalAudioPlayer, useReverseTimer, useRouter, useTimer } from 'shared/hooks';

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

    const { pathname } = useRouter();

    const { src, getFileBlob } = useFetchMediaContent({ url, name, fileType: 'audio' });

    const downloadFile = useMessageStore.use.downloadFile();

    const notification = Notification.use();

    const progress = useEasyState(0);

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const isCurrent = currentlyPlaying.value.apiUrl === url;

    const { load, playing, isReady, src: playerSrc, togglePlayPause, seek, stop } = useGlobalAudioPlayer();

    const { waveform, waveDuration, surf } = waveformStatic({ url: src || ' ', seek, enableSeek: isCurrent });

    useEffect(() => {
        if (isCurrent && currentlyPlaying.value?.currentSec && surf) {
            surf.setCurrentTime(currentlyPlaying.value.currentSec);
            playing && surf.play();
        }
    }, [isCurrent, surf, pathname]);

    useUpdateEffect(() => {
        if (!playing && isCurrent && currentlyPlaying.value?.currentSec) {
            surf?.setCurrentTime(currentlyPlaying.value.currentSec);
        }
    }, [currentlyPlaying.value?.currentSec]);

    useEffect(() => {
        if (!currentlyPlaying.value?.apiUrl && surf) {
            stop();
            surf.stop();
        }
    }, [currentlyPlaying.value?.apiUrl]);

    useEffect(() => {
        if (!isCurrent) {
            surf?.stop();
        } else {
            playing ? surf?.play() : surf?.pause();
        }
    }, [playing, url]);

    const playPauseClick = () => {
        if (isCurrent) {
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
        <div onContextMenu={onContextMenu} className={styles.wrapper}>
            <div className={styles.controls}>
                <Button.Circle radius={37} onClick={playPauseClick}>
                    <Icons.Player variant={playing && isCurrent ? 'pause' : 'play'} />
                </Button.Circle>
            </div>

            <div className={styles.time}>
                <Box.Animated visible={!!currentlyPlaying.value.currentTime && isCurrent} animationVariant="autoWidth">
                    {currentlyPlaying.value.currentTime}/
                </Box.Animated>
                <div>{waveDuration}</div>
            </div>

            <div className={styles.waveform}>
                {!isCurrent && <div className={styles.cover} onClick={playPauseClick} />}
                {waveform}
            </div>
        </div>
    );
}

export default Voice;
