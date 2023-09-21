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
    const { src, isLoading, error, videoPreview } = useFetchMediaContent(url || '', storage.get('cache_size'), 'video');

    return src ? <Video isLoading={isLoading} src={src} {...props} /> : <Image url={videoPreview} width={width || '100%'} height="500px" />;
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
        <div className={styles.wrapper} onClick={onClick} style={{ width: isLoading ? 100 : width || '100%', height: isLoading ? 200 : height }}>
            {video}
            {/* <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}> */}
            {/*    <LoadingIndicator visible /> */}
            {/* </Box.Animated> */}
            {/* {(error || !url) && 'error'} */}
        </div>
    );
}

// export default memo(VideoPlayer, (prevProps, nextProps): any => {
//     if (prevProps.url !== nextProps.url) return false;
//
//     return true;
// });
export default VideoPlayer;
