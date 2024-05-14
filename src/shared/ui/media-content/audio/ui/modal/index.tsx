import React, { useEffect, useMemo } from 'react';
import { createMemo } from 'react-use';

import { useEasyState, useFetchMediaContent, useFs, useRouter } from 'shared/hooks';
import { Audio, ContextMenu, Icons, Modal, ModalTypes, Slider, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../../../../../entities/app';
import { messageApi } from '../../../../../../entities/message';
import { viewerStore } from '../../../../../../entities/viewer';
import { useGlobalAudioPlayer, useInView } from '../../../../../hooks';
import useAudioStore from '../../store';
import useAudioTime from '../../useAudioTime';
import AudioBase from '../base';

function AudioPlayerModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const fs = useFs();
    const { currentTime, duration, currentSec } = useAudioTime(true);

    const sliderValue = useEasyState<any>(null);
    const newTrack = useEasyState<any>(null);
    const visibleMenu = useEasyState(false);
    const visibleList = useEasyState(true);
    const listRepeat = useEasyState(false);
    console.log(duration);
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
        load,
    } = useGlobalAudioPlayer();

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();
    const type = useAudioStore.use.type();

    const { data: audioPosition } = messageApi.handleGetAudioPosition({ chatId: currentlyPlaying.value?.chatId, audioId: currentlyPlaying.value?.searchId });
    const {
        data: audiosData,
        hasNextPage,
        hasPreviousPage,
        fetchPreviousPage,
        fetchNextPage,
    } = messageApi.handleGetAudios({ chatId: currentlyPlaying.value?.chatId, initialPage: audioPosition });

    const { ref: prevPageRef, inView: inViewPrevPage } = useInView();
    const { ref: nextPageRef, inView: inViewNextPage } = useInView();

    const audiosList = audiosData?.pages.reduce((acc: any, i: any) => acc.concat(i.data.data), []) || [];

    useEffect(() => {
        if (inViewPrevPage && hasPreviousPage) {
            fetchPreviousPage();
        }
    }, [inViewPrevPage]);

    useEffect(() => {
        if (inViewNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [inViewNextPage]);

    const { src } = useFetchMediaContent({ url: newTrack.value?.url, name: newTrack.value?.name, fileType: 'audio' });

    const saveFile = () => {
        if (currentlyPlaying.value) {
            visibleMenu.set(false);
            fs.downLoadAndSave({ baseDir: 'download', url: currentlyPlaying.value.apiUrl, fileName: currentlyPlaying.value.name });
        }
    };

    const setTrack = (num: number) => {
        const currentIndex = audiosList.findIndex((i: any) => i.id === currentlyPlaying.value?.searchId);
        const targetTrack = audiosList[currentIndex + num];
        // if (!targetTrack && listRepeat.value) {
        //     return newTrack.set(audiosList[0]);
        // }
        newTrack.set(targetTrack);
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
            load(src, {
                format: 'mp3',
                autoplay: true,
            });
        }
    }, [src]);

    useEffect(() => {
        if (currentTime >= duration) {
            setTrack(+1);
        }
    }, [currentTime]);

    const menuItems = [{ id: 0, icon: <Icons variant="upload" />, title: 'Сохранить аудио', callback: saveFile }];

    return (
        <div className={styles.wrapper}>
            <ContextMenu trigger="mouseup" visible={visibleMenu.value} items={menuItems} />
            <div className={styles.header}>
                <div className={styles.more} onClick={visibleMenu.toggle}>
                    <Icons variant="more" />
                </div>
                <div onClick={modal.close}>
                    <Icons variant="close" />
                </div>
            </div>
            <div className={styles.avatar}>
                <Icons.Picture variant="music" />
            </div>
            <div className={styles.description}>
                <div className={styles.title}>
                    <Title textAlign="left" active variant="H3M">
                        {currentlyPlaying.value?.authorName}
                    </Title>
                    <Title textAlign="left" variant="H4R">
                        {currentlyPlaying.value?.description}
                    </Title>
                </div>
                <div className={styles.rep} onClick={() => loop(!looping)}>
                    <Icons.Player active={looping} variant="repeat" />
                </div>
            </div>
            <div className={styles.slider}>
                <Slider
                    borderRadius={12}
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
            <div className={styles.time}>
                <Title active variant="H4S">
                    {currentTime}
                </Title>
                <Title textAlign="right" active variant="H4S">
                    {duration}
                </Title>
            </div>
            <div className={styles.controls}>
                {audiosList.length > 2 && (
                    <div className={styles.prev} onClick={() => setTrack(-1)}>
                        <Icons.Player variant="prev" />
                    </div>
                )}
                <div className={styles.playPause} onClick={togglePlayPause}>
                    <Icons.Player variant={playing ? 'pause' : 'play'} size={45} />
                </div>
                {audiosList.length > 2 && (
                    <div className={styles.next} onClick={() => setTrack(+1)}>
                        <Icons.Player variant="next" />
                    </div>
                )}
            </div>
            <div className={styles.actions}>
                <div onClick={visibleList.toggle}>
                    <Icons.Player variant="list-visible" active={visibleList.value} />
                </div>
                {/* <div onClick={listRepeat.toggle}> */}
                {/*    <Icons.Player variant="list-repeat" active={listRepeat.value} /> */}
                {/* </div> */}
                {/* <div onClick={visibleList.toggle}> */}
                {/*    <Icons.Player variant="random" /> */}
                {/* </div> */}
            </div>
            {audiosList.length > 1 && visibleList.value ? (
                <div className={styles.list}>
                    <div ref={nextPageRef} />
                    {audiosList.reverse().map((i: any) => (
                        <Audio
                            key={i.id}
                            visibleDropdown={false}
                            chatId={i.chat_id}
                            id={i.id}
                            url={i?.url}
                            name={i?.name}
                            authorName={i?.name}
                            description="неизвестно"
                        />
                    ))}
                    <div ref={prevPageRef} />
                </div>
            ) : null}
        </div>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal} closeIcon={false}>
            <AudioPlayerModal {...modal} />
        </Modal>
    );
}
