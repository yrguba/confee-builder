import React, { useEffect } from 'react';

import { messageStore } from 'entities/message';

import styles from './styles.module.scss';
import { useEasyState, useFs, useFetchMediaContent, useGlobalAudioPlayer } from '../../../../../hooks';
import Icons from '../../../../icons';
import { Box, ContextMenu, ContextMenuTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import useAudioStore from '../../store';
import { BaseAudioProps } from '../../types';

function AudioBase(props: BaseAudioProps) {
    const { visibleDropdown = true, description, disabledDownloads, url, authorName, id, name } = props;
    const visibleMenu = useEasyState(false);
    const notification = Notification.use();

    const downloadFile = messageStore.use.downloadFile();

    const { src } = useFetchMediaContent({ url, name, fileType: 'audio' });

    const fs = useFs();

    const progress = useEasyState(0);

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();
    const type = useAudioStore.use.type();

    const isCurrent = currentlyPlaying.value?.apiUrl === url;

    const { load, play, pause, playing, isReady, src: playerSrc, togglePlayPause } = useGlobalAudioPlayer();

    const playPauseClick = () => {
        if (isCurrent) {
            togglePlayPause();
        } else {
            type.set('audios');
            currentlyPlaying.set({
                id: url,
                apiUrl: url,
                src,
                name,
                authorName,
                description,
            });
            load(src, {
                format: 'mp3',
                autoplay: true,
            });
        }
    };

    const saveFile = () => {
        if (name && url) {
            fs.downLoadAndSave({ baseDir: 'download', url, fileName: name, progressCallback: (percent) => progress.set(percent) });
        }
    };

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        if (visibleDropdown) {
            visibleMenu.toggle();
        } else {
            downloadFile.set({
                fileType: 'audios',
                callback: saveFile,
            });
        }
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

    return (
        <div className={styles.wrapper} onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu}>
            <div className={styles.playPauseIcon} onClick={playPauseClick}>
                <Icons.Player variant={playing && isCurrent ? 'pause-outline' : 'play-outline'} />
            </div>
            <div className={styles.caption}>
                <Title active variant="H3M">
                    {authorName}
                </Title>
                <Box.Replace
                    className={styles.caption_bottom}
                    items={[
                        {
                            visible: playing && isCurrent,
                            item: (
                                <div className={styles.timer}>
                                    <div>{currentlyPlaying.value?.currentTime}</div>/<div>{currentlyPlaying.value?.duration}</div>
                                </div>
                            ),
                        },
                        {
                            visible: !isCurrent ? true : !!(!playing && isCurrent),
                            item: <Title variant="H4R">{description}</Title>,
                        },
                    ]}
                />
            </div>
            <ContextMenu visible={visibleMenu.value} items={menuItems.filter((i) => !i.hidden)} />
        </div>
    );
}

export default AudioBase;
