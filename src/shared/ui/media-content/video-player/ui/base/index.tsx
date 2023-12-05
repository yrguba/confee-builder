import React, { memo } from 'react';

import styles from './styles.module.scss';
import { MediaContentType } from '../../../../../../entities/message/model/types';
import { useEasyState, UseEasyStateReturnType, useFetchMediaContent, useStorage, useVideo } from '../../../../../hooks';
import Box from '../../../../box';
import LoadingIndicator from '../../../../loading-indicator';
import Image from '../../../image';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayer(props: BaseVideoPlayerProps) {
    const { name, clickedFile, visibleCover, url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage();
    const { src, isLoading, error, videoCover, fileBlob } = useFetchMediaContent(url || '', storage.get('save_in_cache'), visibleCover);

    return <Video fileBlob={fileBlob} clickedFile={clickedFile} name={name} videoCover={videoCover || ''} isLoading={isLoading} src={src} {...props} />;
}

type VideoProps = {
    src: string;
    name?: string;
    isLoading: boolean;
    videoCover: string;
    clickedFile?: UseEasyStateReturnType<{ blob: Blob; name: string; type: MediaContentType } | null>;
    fileBlob: Blob | null;
} & BaseVideoPlayerProps;

function Video(props: VideoProps) {
    const { name, fileBlob, clickedFile, videoCover, isLoading, src, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;

    const [video, state, controls, ref] = useVideo(
        <video
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: width || '100%', height, borderRadius: borderRadius ? 12 : 0 }}
            src={src}
            autoPlay
            muted
        />
    );

    return (
        <div
            onContextMenu={() => fileBlob && name && clickedFile && clickedFile.set({ blob: fileBlob, name, type: 'videos' })}
            className={styles.wrapper}
            onClick={onClick}
            style={{ maxWidth: width || '100%', width: width || '100%', height: !state.buffered.length ? 500 : height }}
        >
            {videoCover ? <Image url={videoCover} height={height} width={width} onClick={() => ''} /> : video}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
        </div>
    );
}

export default VideoPlayer;
