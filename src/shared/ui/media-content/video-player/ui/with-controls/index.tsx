import React from 'react';

import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo, useSize } from '../../../../../hooks';
import Box from '../../../../box';
import LoadingIndicator from '../../../../loading-indicator';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayerWithControls(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage<appTypes.ValuesInStorage>();
    const windowsSize = useSize();
    const { src, isLoading, orientation, error } = useFetchMediaContent(url || '', storage.get('cache_size'));

    const [video, state, controls, ref] = useVideo(<video className={styles.video} style={{ borderRadius: borderRadius ? 12 : 0 }} src={src} />);

    const visibleBtn = useEasyState(false);

    return (
        <div
            className={styles.wrapper}
            // onMouseLeave={() => visibleBtn.set(false)}
            // onMouseEnter={() => visibleBtn.set(true)}
        >
            {video}
            <div className={styles.controls}>controls</div>
        </div>
    );
}

export default VideoPlayerWithControls;
