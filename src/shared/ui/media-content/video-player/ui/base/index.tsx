import React from 'react';

import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo } from '../../../../../hooks';
import Box from '../../../../box';
import LoadingIndicator from '../../../../loading-indicator';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayer(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage<appTypes.ValuesInStorage>();
    const { src, isLoading, orientation, error } = useFetchMediaContent(url || '', storage.get('cache_size'));
    const [video, state, controls, ref] = useVideo(<video style={{ width, height, borderRadius: borderRadius ? 12 : 0 }} src={src} autoPlay muted />);

    return (
        <div className={styles.wrapper} onClick={onClick} style={{ width: isLoading ? 200 : width, height: isLoading ? 200 : height }}>
            {!error && !isLoading && video}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
            {(error || !url) && icon}
        </div>
    );
}
const icon = (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M61.25 55.4167V14.5833C61.25 11.375 58.625 8.75 55.4167 8.75H14.5833C11.375 8.75 8.75 11.375 8.75 14.5833V55.4167C8.75 58.625 11.375 61.25 14.5833 61.25H55.4167C58.625 61.25 61.25 58.625 61.25 55.4167ZM24.7917 39.375L32.0833 48.1542L42.2917 35L55.4167 52.5H14.5833L24.7917 39.375Z"
            fill="#E2E9F0"
        />
    </svg>
);

export default VideoPlayer;
