import React, { memo, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import styles from './styles.module.scss';
import { useChatStore } from '../../../../../../entities/chat';
import { useMessageStore } from '../../../../../../entities/message';
import { MediaContentType } from '../../../../../../entities/message/model/types';
import { useEasyState, UseEasyStateReturnType, useFetchMediaContent, useFs, useStorage, useVideo } from '../../../../../hooks';
import Box from '../../../../box';
import Icons from '../../../../icons';
import { ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes } from '../../../../index';
import LoadingIndicator from '../../../../loading-indicator';
import Notification from '../../../../notification';
import Image from '../../../image';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayer(props: BaseVideoPlayerProps) {
    const { previewUrl, disableDownload = true, id, name, visibleCover, url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;

    const fs = useFs();

    const { src, isLoading, error, videoCover, getFileBlob } = useFetchMediaContent({ url, returnedVideoCover: visibleCover, name, fileType: 'video' });

    const downloadFile = useMessageStore.use.downloadFile();

    const notification = Notification.use();

    const progress = useEasyState(0);

    // const { saveFromBack } = useFs();
    const visibleMenu = useEasyState(false);

    const saveFile = () => {
        if (name && url) {
            fs.save({ baseDir: 'download', url, fileName: name, progressCallback: (percent) => progress.set(percent) });
        }
    };

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
        if (!disableDownload) {
            visibleMenu.toggle();
        } else {
            downloadFile.set({
                fileType: 'videos',
                callback: saveFile,
            });
        }
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Скачать видео',
            icon: <Icons variant="save" />,
            callback: async () => {
                visibleMenu.set(false);
                saveFile();
                downloadFile.clear();
            },
        },
    ];

    useEffect(() => {
        if (progress.value === 100) {
            notification.success({ title: 'Видео сохранено', system: true });
        }
    }, [progress.value]);

    return (
        <div
            onMouseLeave={() => visibleMenu.set(false)}
            onContextMenu={clickContextMenu}
            className={styles.wrapper}
            onClick={onClick}
            style={{ maxWidth: width || '100%', width: width || '100%', height }}
        >
            {progress.value > 0 && progress.value < 100 && (
                <div className={styles.savingFile}>
                    <LoadingIndicator.Downloaded size={50} visible primary={false} />
                </div>
            )}
            {videoCover || previewUrl ? <Image url={videoCover || previewUrl || ''} height={height} width={width} onClick={() => ''} /> : video}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
            <ContextMenu visible={visibleMenu.value} items={menuItems} />
        </div>
    );
}

export default VideoPlayer;
