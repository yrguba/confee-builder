import React, { RefObject, useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import styles from './styles.module.scss';
import { useEasyState, useFs, useAudio, useFetchMediaContent } from '../../../../../hooks';
import { sizeConverter, timeConverter } from '../../../../../lib';
import momentLocalZone from '../../../../../lib/moment-local-zone';
import Icons from '../../../../icons';
import { Box, ContextMenu, ContextMenuTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import useAudioStore from '../../store';
import { BaseAudioProps } from '../../types';

function AudioBase(props: BaseAudioProps) {
    const { disabledDownloads, url, size, name, date, authorName, id } = props;
    const visibleMenu = useEasyState(false);
    const notification = Notification.use();
    const visibleTiming = useEasyState(false);

    const { src } = useFetchMediaContent({ url, name, fileType: 'audio' });

    const audioRef: any = useRef(null);

    useUpdateEffect(() => {
        if (src) {
            audioRef.current = new Audio(src);
        }
    }, [src]);

    useAudioStore.use.observer();
    const togglePlay = useAudioStore.use.togglePlay();
    const checkIsPlaying = useAudioStore.use.checkIsPlaying();

    const fs = useFs();

    const progress = useEasyState(0);

    const saveFile = () => {
        if (name && url) {
            fs.save({ baseDir: 'download', url, fileName: name, progressCallback: (percent) => progress.set(percent) });
        }
    };

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        visibleMenu.toggle();
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Скачать аудио',
            icon: <Icons variant="save" />,
            callback: async () => {
                visibleMenu.set(false);
                saveFile();
                notification.success({ title: 'Аудио сохранен', system: true });
            },
        },
    ];

    useEffect(() => {
        if (progress.value === 100) {
            notification.success({ title: 'Аудио сохранен', system: true });
        }
    }, [progress.value]);

    const totalTime = timeConverter(Math.ceil(0));
    const currentTime = timeConverter(Math.ceil(0));

    const onPlay = () => {
        togglePlay(audioRef);
    };

    return (
        <div className={styles.wrapper} onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu}>
            <audio ref={audioRef} autoPlay />
            <div className={styles.icon} onClick={onPlay}>
                <Icons.Player variant={checkIsPlaying(src) ? 'pause' : 'play'} />
            </div>
            <div className={styles.caption}>
                <Title variant="H3M">{authorName}</Title>
                <Box.Replace
                    className={styles.caption_bottom}
                    items={[
                        {
                            visible: visibleTiming.value,
                            item: (
                                <div className={styles.timer}>
                                    <div>{`${currentTime.h ? `${currentTime.h}:` : ''}${currentTime.m}:${currentTime.s}`}</div>/
                                    <div>{`${totalTime.h ? `${totalTime.h}:` : ''}${totalTime.m}:${totalTime.s}`}</div>
                                </div>
                            ),
                        },
                        {
                            visible: !visibleTiming.value,
                            item: <Title variant="H4R">{date ? momentLocalZone(date).format('Do MMMM, h:mm') : sizeConverter(size || 0)}</Title>,
                        },
                    ]}
                />
            </div>
            <ContextMenu visible={visibleMenu.value} items={menuItems.filter((i) => !i.hidden)} />
        </div>
    );
}

export default AudioBase;
