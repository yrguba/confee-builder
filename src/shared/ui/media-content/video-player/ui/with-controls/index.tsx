import { motion } from 'framer-motion';
import React from 'react';
import { useUpdateEffect } from 'react-use';

import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo, useSize, useIdle } from '../../../../../hooks';
import Box from '../../../../box';
import Button from '../../../../button';
import Icons from '../../../../icons';
import Slider from '../../../../slider';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayerWithControls(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width, reset } = props;
    const storage = useStorage<appTypes.ValuesInStorage>();
    const windowsSize = useSize();
    const { src, isLoading, orientation, error } = useFetchMediaContent(url || '', storage.get('cache_size'));
    const isFull = useEasyState(false);
    const visibleControl = useEasyState(true);
    const [video, state, controls, ref] = useVideo(
        <motion.video
            initial={{ width: isFull.value ? '100%' : '', height: isFull.value ? '100%' : '' }}
            animate={{ width: isFull.value ? '100%' : '', height: isFull.value ? '100%' : '' }}
            className={styles.video}
            style={{ borderRadius: borderRadius ? 12 : 0 }}
            src={src}
        />
    );

    const idle = useIdle(2000);
    console.log(idle);
    useUpdateEffect(() => {
        isFull && visibleControl.set(!idle);
    }, [idle]);

    useUpdateEffect(() => {
        isFull.set(false);
        controls.pause();
    }, [reset]);

    return (
        <div
            className={`${styles.wrapper} ${isFull.value ? styles.wrapper_full : ''}`}
            // onMouseLeave={() => visibleBtn.set(false)}
            // onMouseEnter={() => visibleBtn.set(true)}
        >
            {video}
            <Box.Animated key={`${isFull.value}`} visible={visibleControl.value} className={styles.controls}>
                <div className={styles.top}>
                    <div className={styles.volume}>
                        <Icons.Player variant={state.muted ? 'unmute' : 'mute'} />
                        <Slider />
                    </div>
                    <Button.Circle variant="inherit" onClick={!state.playing ? controls.play : controls.pause}>
                        <Icons.Player variant={state.playing ? 'pause' : 'play'} />
                    </Button.Circle>
                    <div className={styles.actions}>
                        <Button.Circle variant="inherit" radius={30} onClick={isFull.toggle}>
                            <Icons.Player variant="full" />
                        </Button.Circle>
                        <Button.Circle variant="inherit" radius={30}>
                            <Icons variant="more" />
                        </Button.Circle>
                    </div>
                </div>
                <div className={styles.bottom} />
            </Box.Animated>
        </div>
    );
}

export default VideoPlayerWithControls;
