import React, { useEffect, useRef } from 'react';

import { useEasyState, useFetchMediaContent, useGlobalAudioPlayer, useRustServer, useThrottle, useUpdateEffect } from 'shared/hooks';
import { Modal } from 'shared/ui';

import styles from './styles.module.scss';
import { messageApi } from '../../../../../../entities/message';
import { timeConverter } from '../../../../../lib';
import { Box, Dropdown, Icons, Slider, Title } from '../../../../index';
import useAudioStore from '../../store';
import { PlayerProps } from '../../types';
import useAudioTime from '../../useAudioTime';
import AudioPlayerModal from '../modal';
import Volume from '../volume';

function Player(props: PlayerProps) {
    const { sliderPosition = 'bottom', autoHeight, width } = props;

    const wrapperRef = useRef<any>(null);

    const audioPlayerModal = Modal.use();
    const type = useAudioStore.use.type();
    const currentlyPlaying = useAudioStore.use.currentlyPlaying();
    const repeatList = useAudioStore.use.repeatList();
    const audiosList = useAudioStore.use.list();

    const { data: audioPosition } = messageApi.handleGetAudioPosition({ chatId: currentlyPlaying.value?.chatId, audioId: currentlyPlaying.value?.searchId });
    const { data: audiosData } = messageApi.handleGetAudios({ chatId: currentlyPlaying.value?.chatId, initialPage: audioPosition });

    const { rustIsRunning, useWebview } = useRustServer();
    const webview = useWebview('main');

    const sliderValue = useEasyState<any>(null);
    const visibleVolume = useEasyState<any>(false);
    const visibleElements = useEasyState<any>([0, 1, 2, 3, 4]);
    const newTrack = useEasyState<any>(null);

    const { src } = useFetchMediaContent({ url: newTrack.value?.url, name: newTrack.value?.name, fileType: 'audio' });

    const {
        load,
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

    const setTrack = (num: number) => {
        if (audiosList.value) {
            const currentIndex = audiosList?.value?.findIndex((i: any) => i.id === currentlyPlaying.value?.searchId);
            const targetTrack = audiosList.value[currentIndex + num];

            if (targetTrack) {
                newTrack.set(targetTrack);
            } else if (repeatList.value) {
                newTrack.set(audiosList.value[0]);
            }
        }
    };

    useEffect(() => {
        if (src && newTrack.value) {
            type.set('audios');
            currentlyPlaying.set({
                chatId: newTrack.value.chat_id,
                searchId: newTrack.value.id,
                id: newTrack.value.url,
                apiUrl: newTrack.value.url,
                src,
                name: newTrack.value.name,
                authorName: newTrack.value.name,
                description: 'неисвестно',
            });
        }
    }, [src]);

    useUpdateEffect(() => {
        if (currentlyPlaying.value?.src) {
            load(currentlyPlaying.value?.src, {
                format: 'mp3',
                autoplay: true,
            });
        }
    }, [currentlyPlaying.value?.src]);

    const leftControls = [
        {
            id: 0,
            icon: <Icons.Player variant="prev" />,
            callback: () => {
                setTrack(-1);
            },
            hidden: audiosList.value && audiosList.value.length < 2,
        },
        {
            id: 1,
            icon: <Icons.Player variant={playing ? 'pause' : 'play'} />,
            callback: () => {
                togglePlayPause();
            },
        },
        {
            id: 2,
            icon: <Icons.Player variant="next" />,
            callback: () => {
                setTrack(+1);
            },
            hidden: audiosList.value && audiosList.value.length < 2,
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

    useEffect(() => {
        if (currentTime >= duration && currentTime !== '00:00') {
            setTrack(+1);
        }
    }, [currentTime]);

    useEffect(() => {
        const arr: any = [];
        audiosData?.pages.forEach((i) => {
            i.data.data.forEach((t: any) => {
                arr.unshift(t);
            });
        });
        audiosList.set(arr);
    }, [audiosData]);

    return (
        <>
            <AudioPlayerModal {...audioPlayerModal} />
            <Box.Animated animationVariant={autoHeight ? 'autoHeight' : 'visibleHidden'} visible={!!currentlyPlaying.value?.src} className={styles.wrapper}>
                <div className={styles.container} ref={wrapperRef}>
                    <div className={styles.left}>
                        <div className={styles.controls}>
                            {leftControls.map(
                                (i) =>
                                    !i.hidden && (
                                        <div key={i.id} onClick={i.callback} className={styles.item}>
                                            {i.icon}
                                        </div>
                                    )
                            )}
                        </div>
                        <div className={styles.descriptions} onClick={audioPlayerModal.open}>
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
        </>
    );
}

export default Player;
