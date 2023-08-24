import React from 'react';

import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo } from '../../../../../hooks';
import Box from '../../../../box';
import LoadingIndicator from '../../../../loading-indicator';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayerWithControls(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage<appTypes.ValuesInStorage>();

    const { src, isLoading, orientation, error } = useFetchMediaContent(url || '', storage.get('cache_size'));

    const [video, state, controls, ref] = useVideo(<video style={{ width, height, borderRadius: borderRadius ? 12 : 0 }} src={src} autoPlay muted />);

    const visibleBtn = useEasyState(false);

    return (
        <div
            className={styles.wrapper}
            style={{ width: isLoading ? 200 : width, height: isLoading ? 200 : height }}
            // onMouseLeave={() => visibleBtn.set(false)}
            // onMouseEnter={() => visibleBtn.set(true)}
        >
            {video}
        </div>
    );
}

export default VideoPlayerWithControls;
