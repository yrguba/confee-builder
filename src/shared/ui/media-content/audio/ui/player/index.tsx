import React, { useEffect, useRef } from 'react';

import { useEasyState, useGlobalAudioPlayer, useRustServer, useThrottle, useUpdateEffect } from 'shared/hooks';

import styles from './styles.module.scss';
import { timeConverter } from '../../../../../lib';
import { Box, Dropdown, Icons, Slider, Title } from '../../../../index';
import useAudioStore from '../../store';
import { PlayerProps } from '../../types';
import Volume from '../volume';

function Player(props: PlayerProps) {
    const { sliderPosition = 'bottom', autoHeight, width } = props;

    const wrapperRef = useRef<any>(null);

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const { rustIsRunning, useWebview } = useRustServer();
    const webview = useWebview('main');

    const sliderValue = useEasyState<any>(null);
    const visibleVolume = useEasyState<any>(false);
    const visibleElements = useEasyState<any>([0, 1, 2, 3, 4]);

    const {
        stop,
        play,
        pause,
        playing,
        togglePlayPause,
        duration: durationNum,
        seek,
        loop,
        looping,
        setRate,
        rate,
        volume,
        setVolume,
    } = useGlobalAudioPlayer();

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
            element: <Title active={rate > 1} color="inactive" variant="H3S">{`${rate > 1 ? rate.toFixed(1) : 1}x`}</Title>,
            callback: () => {
                setRate(rate > 1.9 ? 1 : rate + 0.1);
            },
        },
        {
            id: 1,
            element: <Volume volume={volume} setVolume={setVolume} sliderPosition={sliderPosition} />,
            callback: () => {},
        },
        {
            id: 2,
            element: <Icons.Player variant="repeat" active={looping} />,
            callback: () => {
                loop(!looping);
            },
        },
        {
            id: 3,
            element: <div className={styles.timing}>{`${currentTime}/${duration}`}</div>,
            callback: () => {},
        },
        {
            id: 4,
            element: <Icons variant="close" />,
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
        } as any);
    }, [currentSec, sliderValue.value]);

    useUpdateEffect(() => {
        if (width < 350) return visibleElements.set([4]);
        if (width < 370) return visibleElements.set([1, 4]);
        if (width < 390) return visibleElements.set([1, 3, 4]);
        if (width < 410) return visibleElements.set([0, 1, 3, 4]);
        return visibleElements.set([0, 1, 2, 3, 4]);
    }, [width]);

    useEffect(() => {
        webview.listen('close-requested', () => {
            currentlyPlaying.clear();
        });
    }, []);

    return (
        <Box.Animated animationVariant={autoHeight ? 'autoHeight' : 'visibleHidden'} visible={!!currentlyPlaying.value?.src} className={styles.wrapper}>
            <div className={styles.container} ref={wrapperRef}>
                <div className={styles.left}>
                    <div className={styles.controls}>
                        {leftControls.map((i) => (
                            <div key={i.id} onClick={i.callback} className={styles.item}>
                                {i.icon}
                            </div>
                        ))}
                    </div>
                    <div className={styles.descriptions}>
                        <Title variant="H3M">{currentlyPlaying.value?.authorName}</Title>
                        <Title primary={false} variant="H4R">
                            {currentlyPlaying.value?.description}
                        </Title>
                    </div>
                </div>
                <div className={styles.right}>
                    {rightControls
                        .filter((i) => visibleElements.value.includes(i.id))
                        .map((i) => (
                            <div key={i.id} onClick={i.callback} className={styles.item} style={{ pointerEvents: i.id === 3 ? 'none' : 'auto' }}>
                                {i.element}
                            </div>
                        ))}
                </div>
            </div>
            <div className={styles.slider} style={{ [sliderPosition]: sliderPosition === 'top' ? -5 : 0 }}>
                <Slider
                    borderRadius={0}
                    max={durationNum}
                    step={0.001}
                    value={sliderValue.value || currentlyPlaying.value?.currentSec}
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

const [throttle] = useThrottle((cl) => cl(), 1000);

function useAudioTime(enabled: boolean) {
    const frameRef = useRef<number>();
    const currentTime = useEasyState('');
    const currentSec = useEasyState(0);
    const { getPosition, duration, playing } = useGlobalAudioPlayer();

    useEffect(() => {
        if (playing) {
            const animate = () => {
                const pos = Math.ceil(getPosition());
                currentTime.set(timeConverter(pos));
                currentSec.set(pos);
                frameRef.current = requestAnimationFrame(animate);
                throttle(() => {});
            };

            frameRef.current = window.requestAnimationFrame(animate);

            return () => {
                if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
                }
            };
        }
    }, [getPosition(), playing]);

    return { currentTime: currentTime.value, currentSec: currentSec.value, duration: timeConverter(duration) };
}
