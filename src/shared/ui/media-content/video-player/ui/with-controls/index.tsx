import React from 'react';

import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo, useSize } from '../../../../../hooks';
import Box from '../../../../box';
import Button from '../../../../button';
import Icons from '../../../../icons';
import LoadingIndicator from '../../../../loading-indicator';
import Slider from '../../../../slider';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayerWithControls(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width } = props;
    const storage = useStorage<appTypes.ValuesInStorage>();
    const windowsSize = useSize();
    const { src, isLoading, orientation, error } = useFetchMediaContent(url || '', storage.get('cache_size'));
    const isFull = useEasyState(false);

    const [video, state, controls, ref] = useVideo(
        <video
            className={styles.video}
            style={{ width: isFull.value ? '100%' : '', height: isFull.value ? '100%' : '', borderRadius: borderRadius ? 12 : 0 }}
            src={src}
        />
    );

    return (
        <div
            className={`${styles.wrapper} ${isFull.value ? 'styles.wrapper_full' : ''}`}
            // onMouseLeave={() => visibleBtn.set(false)}
            // onMouseEnter={() => visibleBtn.set(true)}
        >
            {video}
            <div className={styles.controls}>
                <Button.Circle variant="inherit" onClick={!state.playing ? controls.play : controls.pause}>
                    <Icons.Player variant={state.playing ? 'pause' : 'play'} />
                </Button.Circle>
                <Slider />
            </div>
        </div>
    );
}

export default VideoPlayerWithControls;
