import { motion } from 'framer-motion';
import React from 'react';
import { useUpdateEffect } from 'react-use';
import { VideoSeekSlider } from 'react-video-seek-slider';

import 'react-video-seek-slider/styles.css';
import { appTypes } from 'entities/app';

import styles from './styles.module.scss';
import { useEasyState, useFetchMediaContent, useStorage, useVideo, useSize, useIdle } from '../../../../../hooks';
import { secondsToHms } from '../../../../../lib';
import Box from '../../../../box';
import Button from '../../../../button';
import Icons from '../../../../icons';
import Slider from '../../../../slider';
import Title from '../../../../title';
import { BaseVideoPlayerProps } from '../../types';

function VideoPlayerWithControls(props: BaseVideoPlayerProps) {
    const { url, onClick, borderRadius = true, height, horizontalImgWidth, width, reset, name } = props;
    const storage = useStorage();
    const windowsSize = useSize();
    const { src, isLoading, error } = useFetchMediaContent({ url, name });
    const isFull = useEasyState(false);
    const visibleControl = useEasyState(true);

    const [video, state, controls, ref] = useVideo(
        <motion.video
            initial={{ width: isFull.value ? '100%' : '', height: isFull.value ? '100%' : '' }}
            animate={{ width: isFull.value ? '100%' : '', height: isFull.value ? '100%' : '' }}
            className={styles.video}
            style={{ borderRadius: borderRadius ? 12 : 0 }}
            src={src}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        />
    );

    const idle = useIdle(2000);

    useUpdateEffect(() => {
        if (isFull.value) {
            visibleControl.set(!idle);
        } else {
            visibleControl.set(true);
        }
    }, [idle, isFull]);

    useUpdateEffect(() => {
        isFull.set(false);
        controls.pause();
    }, [reset]);

    return (
        <div className={`${styles.wrapper} ${isFull.value ? styles.wrapper_full : ''}`}>
            {video}
            <Box.Animated key={`${isFull.value}`} visible={visibleControl.value} className={styles.controls}>
                <div className={styles.top}>
                    <div className={styles.volume}>
                        <Button.Circle variant="inherit" radius={30} onClick={state.muted ? controls.unmute : controls.mute}>
                            <Icons.Player variant={!state.muted ? 'unmute' : 'mute'} />
                        </Button.Circle>

                        <Slider max={1} step={0.01} defaultValue={state.volume} onChange={(value) => typeof value === 'number' && controls.volume(value)} />
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
                <div className={styles.bottom}>
                    <div className={styles.time}>
                        <Title variant="H4M">{secondsToHms(Math.ceil(state.time))}</Title>
                    </div>
                    <div className={styles.slider}>
                        <VideoSeekSlider
                            max={state.duration}
                            secondsPrefix="00:"
                            minutesPrefix="0:"
                            currentTime={state.time}
                            bufferTime={state.buffered[0]?.time}
                            limitTimeTooltipBySides
                            // getPreviewScreenUrl={() => ''}
                            hideThumbTooltip
                            onChange={controls.seek}
                        />
                    </div>
                    <div className={styles.timeReverse}>
                        <Title textAlign="right" variant="H4M">{`-${secondsToHms(Math.floor(state.duration - state.time))}`}</Title>
                    </div>
                </div>
            </Box.Animated>
        </div>
    );
}

export default VideoPlayerWithControls;
