import React, { memo } from 'react';
import { useRendersCount, useUpdateEffect } from 'react-use';

import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo } from '../../../../../hooks';
import Box from '../../../../box';
import LoadingIndicator from '../../../../loading-indicator';
import Image from '../../../image';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayer(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage();
    const { src, isLoading, error } = useFetchMediaContent(url || '', storage.get('save_in_cache'));

    return <Video isLoading={isLoading} src={src} {...props} />;
}

type VideoProps = {
    src: string;
    isLoading: boolean;
} & BaseVideoPlayerProps;

function Video(props: VideoProps) {
    const { isLoading, src, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;

    const [video, state, controls, ref] = useVideo(
        <video style={{ width: width || '100%', height, borderRadius: borderRadius ? 12 : 0 }} src={src} autoPlay muted />
    );

    return (
        <div className={styles.wrapper} onClick={onClick} style={{ width: width || '100%', height: !state.buffered.length ? 500 : height }}>
            {video}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
        </div>
    );
}

export default VideoPlayer;
