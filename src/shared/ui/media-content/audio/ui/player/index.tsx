import React from 'react';

import { useGlobalAudioPlayer } from 'shared/hooks';

import styles from './styles.module.scss';
import { Box, Icons, Title } from '../../../../index';
import useAudioStore from '../../store';

function Player(props: any) {
    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const { stop, load, play, pause, playing, isReady, src: playerSrc, togglePlayPause } = useGlobalAudioPlayer();

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

    return (
        <Box.Animated visible={!!currentlyPlaying.value.src} className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div>
                        {leftControls.map((i) => (
                            <div onClick={i.callback} className={styles.item}>
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
                    {rightControls.map((i) => (
                        <div onClick={i.callback} className={styles.item}>
                            {i.icon}
                        </div>
                    ))}
                </div>
            </div>
        </Box.Animated>
    );
}

export default Player;
