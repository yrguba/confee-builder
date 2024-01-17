import React, { memo } from 'react';

import styles from './styles.module.scss';
import { useChatStore } from '../../../../../../entities/chat';
import { MediaContentType } from '../../../../../../entities/message/model/types';
import { useEasyState, UseEasyStateReturnType, useFetchMediaContent, useSaveMediaContent, useStorage, useVideo } from '../../../../../hooks';
import Box from '../../../../box';
import Icons from '../../../../icons';
import { ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes } from '../../../../index';
import LoadingIndicator from '../../../../loading-indicator';
import Notification from '../../../../notification';
import Image from '../../../image';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayer(props: BaseVideoPlayerProps) {
    const { disableDownload = true, id, name, clickedFile, visibleCover, url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage();
    const { src, isLoading, error, videoCover, fileBlob } = useFetchMediaContent(url || '', false, visibleCover);
    const notification = Notification.use();

    const { saveInDownload, isLoading: loadingSaveFile } = useSaveMediaContent();
    const visibleMenu = useEasyState(false);

    const idOfSavedFile = useChatStore.use.idOfSavedFile();

    const [video, state, controls, ref] = useVideo(
        <video
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: width || '100%', height, borderRadius: borderRadius ? 12 : 0 }}
            src={src}
            autoPlay
            muted
        />
    );

    const clickContextMenu = () => {
        if (clickedFile && fileBlob && name && id) {
            clickedFile.set({ blob: fileBlob, name, id, type: 'videos' });
        }
        if (!disableDownload) {
            visibleMenu.toggle();
        }
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Скачать видео',
            icon: <Icons variant="save" />,
            callback: async () => {
                visibleMenu.set(false);
                await saveInDownload(fileBlob, name);
                notification.success({ title: 'Видео сохранено', system: true });
            },
        },
    ];

    return (
        <div
            onMouseLeave={() => visibleMenu.set(false)}
            onContextMenu={clickContextMenu}
            className={styles.wrapper}
            onClick={onClick}
            style={{ maxWidth: width || '100%', width: width || '100%', height: !state.buffered.length ? 500 : height }}
        >
            {id === idOfSavedFile.value && (
                <div className={styles.savingFile}>
                    <LoadingIndicator.Downloaded size={50} visible primary={false} />
                </div>
            )}
            {videoCover ? <Image url={videoCover} height={height} width={width} onClick={() => ''} /> : video}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
            <ContextMenu visible={visibleMenu.value} items={menuItems} />
        </div>
    );
}

export default VideoPlayer;
