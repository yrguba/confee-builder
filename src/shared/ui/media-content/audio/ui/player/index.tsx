import React, { useEffect, useRef, useState } from 'react';

import { useEasyState, useGlobalAudioPlayer } from 'shared/hooks';

import styles from './styles.module.scss';
import { timeConverter } from '../../../../../lib';
import { Box, Icons, Title } from '../../../../index';
import useAudioStore from '../../store';

function Player(props: any) {
    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const { stop, load, play, pause, playing, isReady, src: playerSrc, togglePlayPause } = useGlobalAudioPlayer();

    const { currentTime, duration, currentSec } = useAudioTime(playing);

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

    useEffect(() => {
        currentlyPlaying.set({
            ...currentlyPlaying.value,
            currentSec,
            duration,
            currentTime,
        });
    }, [currentSec]);

    return (
        <Box.Animated visible={!!currentlyPlaying.value.src} className={styles.wrapper}>
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
        </Box.Animated>
    );
}

export default Player;
function useAudioTime(enabled: boolean) {
    const frameRef = useRef<number>();
    const currentTime = useEasyState('');
    const currentSec = useEasyState(0);
    const { getPosition, duration } = useGlobalAudioPlayer();

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
    }, [enabled]);

    return { currentTime: currentTime.value, currentSec: currentSec.value, duration: timeConverter(duration) };
}
