import React, { useEffect, useRef } from 'react';

import { useEasyState, useGlobalAudioPlayer, useUpdateEffect } from 'shared/hooks';

import styles from './styles.module.scss';
import { timeConverter } from '../../../../../lib';
import { Box, Icons, Slider, Title } from '../../../../index';
import useAudioStore from '../../store';
import { PlayerProps } from '../../types';

function Player(props: PlayerProps) {
    const { sliderPosition = 'bottom', autoHeight } = props;

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const handleSlider = useEasyState(false);
    const sliderValue = useEasyState<any>(null);

    const { stop, play, pause, playing, togglePlayPause, duration: durationNum, seek } = useGlobalAudioPlayer();

    const { currentTime, duration, currentSec } = useAudioTime(true);

    const leftControls = [
        {
            id: 0,
            icon: <Icons.Player variant={playing ? 'pause' : 'play'} />,
            callback: () => {
                togglePlayPause();
            },
        },
    ];

    const rightControls = [
        {
            id: 0,
            icon: <Icons variant="close" />,
            callback: () => {
                stop();
                currentlyPlaying.clear();
            },
        },
    ];

    useUpdateEffect(() => {
        currentlyPlaying.set({
            ...currentlyPlaying.value,
            currentSec: sliderValue.value ? sliderValue.value : currentSec,
            duration,
            currentTime,
        });
    }, [currentSec, sliderValue.value]);

    return (
        <Box.Animated animationVariant={autoHeight ? 'autoHeight' : 'visibleHidden'} visible={!!currentlyPlaying.value.src} className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div>
                        {leftControls.map((i) => (
                            <div key={i.id} onClick={i.callback} className={styles.item}>
                                {i.icon}
                            </div>
                        ))}
                    </div>
                    <div>
                        <Title variant="H3M">{currentlyPlaying.value.authorName}</Title>
                        <Title variant="H4R">{currentlyPlaying.value.description}</Title>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.time}>{`${currentTime}/${duration}`}</div>
                    {rightControls.map((i) => (
                        <div key={i.id} onClick={i.callback} className={styles.item}>
                            {i.icon}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.slider} style={{ [sliderPosition]: sliderPosition === 'top' ? -5 : 0 }}>
                <Slider
                    borderRadius={0}
                    max={durationNum}
                    step={0.001}
                    dotStyle={{
                        width: 0,
                        height: 0,
                    }}
                    value={sliderValue.value || currentlyPlaying.value.currentSec}
                    onChange={(value) => {
                        if (typeof value === 'number') {
                            sliderValue.set(value);
                            seek(sliderValue.value);
                        }
                    }}
                    onAfterChange={(value) => {
                        if (typeof value === 'number') {
                            sliderValue.set(null);
                            play();
                        }
                    }}
                    onBeforeChange={() => {
                        pause();
                    }}
                />
            </div>
        </Box.Animated>
    );
}

export default Player;
function useAudioTime(enabled: boolean) {
    const frameRef = useRef<number>();
    const currentTime = useEasyState('');
    const currentSec = useEasyState(0);
    const { getPosition, duration, playing } = useGlobalAudioPlayer();

    useEffect(() => {
        if (enabled) {
            const animate = () => {
                const pos = getPosition();
                currentTime.set(timeConverter(pos));
                currentSec.set(pos);
                frameRef.current = requestAnimationFrame(animate);
            };

            frameRef.current = window.requestAnimationFrame(animate);

            return () => {
                if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
                }
            };
        }
    }, [enabled, playing]);

    return { currentTime: currentTime.value, currentSec: currentSec.value, duration: timeConverter(duration) };
}
