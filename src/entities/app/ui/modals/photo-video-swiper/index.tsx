import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useEasyState, useInView } from 'shared/hooks';
import { Button, Card, ContextMenu, Icons, Image, Video } from 'shared/ui';
import VideoPlayerWithControls from 'shared/ui/media-content/video/ui/with-controls';

import styles from './styles.module.scss';
import { getCroppedImg } from '../../../../../shared/lib/canvas';
import { PhotoAndVideoSwiperType, PhotoAndVideoSwiperItemsType } from '../../../model/types';

type Props = {
    data?: PhotoAndVideoSwiperType;
    close: () => void;
    downloads: (items: any) => void;
    deleteMessage: () => void;
    forward: () => void;
    deleteImage: (id: string | number) => void;
};

function PhotoVideoSwiperView(props: Props) {
    const { forward, data, close, downloads, deleteMessage, deleteImage } = props;

    const activeSlideRef = useRef<any>(null);
    const bottomSwiperRef = useRef<any>(null);

    const visibleLeftBtn = useEasyState(true);
    const visibleRightBtn = useEasyState(true);

    const activeItem = useEasyState<PhotoAndVideoSwiperItemsType | null>(null);

    const fullScreen = useEasyState(false);
    const visibleContextMenu = useEasyState(false);

    const { ref: firsItemRef, inView: inViewFirsItemRef } = useInView({ threshold: 0.5 });
    const { ref: lastItemRef, inView: inViewLastItemRef } = useInView({ threshold: 0.5 });

    const nextSlide = () => {
        const foundIndex: any = data?.items.findIndex((i) => i.id === activeItem.value?.id);
        if (foundIndex !== -1) {
            const next = data?.items[foundIndex + 1];
            next && activeItem.set(next);
        }
    };

    const prevSlide = () => {
        const foundIndex: any = data?.items.findIndex((i) => i.id === activeItem.value?.id);
        if (foundIndex !== -1) {
            const next = data?.items[foundIndex - 1];
            next && activeItem.set(next);
        }
    };

    const actions = [
        { id: 0, icon: <Icons variant="upload" />, onClick: () => visibleContextMenu.set(true) },
        { id: 1, icon: <Icons variant="redirect" />, onClick: forward },
        { id: 2, icon: <Icons variant="delete" />, onClick: deleteMessage },
    ];

    const actionsImgUpdate = [
        { id: 0, icon: <Icons variant="crop" />, onClick: () => '' },
        { id: 1, icon: <Icons variant="edit" />, onClick: () => '' },
        {
            id: 2,
            icon: <Icons variant="delete" />,
            onClick: () => {
                visibleLeftBtn.value ? prevSlide() : nextSlide();
                deleteImage(activeItem.value?.id || 0);
            },
        },
    ];

    const contextMenuItems = [
        {
            id: 0,
            title: 'Все фото',
            callback: () => {
                downloads(data?.items);
                visibleContextMenu.set(false);
            },
        },
        {
            id: 1,
            title: 'Только это',
            callback: () => {
                downloads(activeItem.value);
                visibleContextMenu.set(false);
            },
        },
    ];

    useEffect(() => {
        activeSlideRef?.current?.scrollIntoView();
        visibleLeftBtn.set(activeItem.value?.id !== data?.items[0].id);
        visibleRightBtn.set(activeItem.value?.id !== data?.items[data?.items.length - 1].id);
    }, [activeItem.value?.id]);

    useEffect(() => {
        const found = data?.items.find((i, index) => index === data?.startIndex);
        found && activeItem.set(found);
    }, [data?.startIndex]);

    const multiple = data?.items?.length && data.items.length > 1;

    const bottomSwiperRefs = (item: any, index: number) => {
        const refs = [];
        if (item.id === activeItem.value?.id) refs.push(activeSlideRef);
        if (index === 0) refs.push(firsItemRef);
        if (data?.items.length && index === data?.items.length - 1) refs.push(lastItemRef);
        return refs;
    };

    const scroll = (scrollOffset: number) => {
        if (bottomSwiperRef.current) {
            bottomSwiperRef.current.scrollLeft += scrollOffset;
        }
    };

    const actionItems = data?.update ? actionsImgUpdate : actions;

    // const showCroppedImage = useCallback(async () => {
    //     // try {
    //     //     const croppedImage = await getCroppedImg(activeItem.value?.url, croppedAreaPixels.value, rotation.value);
    //     //     console.log('donee', { croppedImage });
    //     //     console.log(croppedImage);
    //     // } catch (e) {
    //     //     console.error(e);
    //     // }
    // }, [croppedAreaPixels.value, rotation.value]);

    return (
        <div className={styles.wrapper} onContextMenu={(e) => e.preventDefault()}>
            <ContextMenu
                reverseY
                clickAway={() => visibleContextMenu.set(false)}
                trigger="mouseup"
                visible={visibleContextMenu.value}
                items={contextMenuItems}
            />
            <div className={styles.closeIcon} onClick={close}>
                <Icons variant="close" />
            </div>
            <div className={styles.swiperTop} style={{ margin: fullScreen.value ? '0' : '20px 0', height: `calc(100% - ${multiple ? '230px' : '130px'})` }}>
                {visibleLeftBtn.value && (
                    <div className={styles.btnLeft} onClick={prevSlide}>
                        {multiple && <Icons variant="arrow-drop-left" />}
                    </div>
                )}

                {activeItem.value && (
                    <div className={styles.slideTop}>
                        {data?.type === 'img' && <Image height="100%" visibleDropdown={false} url={activeItem.value?.url} objectFit="contain" />}
                        {data?.type === 'video' && (
                            <VideoPlayerWithControls autoPlay clickFull={() => fullScreen.toggle()} visibleDropdown={false} url={activeItem.value.url} />
                        )}
                    </div>
                )}
                {visibleRightBtn.value && (
                    <div className={styles.btnRight} onClick={nextSlide}>
                        {multiple && <Icons variant="arrow-drop-right" />}
                    </div>
                )}
            </div>
            {data?.type === 'img' && (
                <div className={styles.fullScreen} style={{ bottom: fullScreen.value ? 30 : 290 }} onClick={fullScreen.toggle}>
                    <Icons.Player variant="full" />
                </div>
            )}
            <div className={`${styles.footer} ${fullScreen.value ? styles.footer_hidden : ''}`}>
                <div className={styles.actions}>
                    {actionItems.map((i) => (
                        <div key={i.id} className={styles.item} onClick={i.onClick}>
                            {i.icon}
                        </div>
                    ))}
                </div>
                {multiple && (
                    <div className={styles.swiperContainer}>
                        {!inViewFirsItemRef && (
                            <div className={styles.btnLeft} onClick={() => scroll(-220)}>
                                <Icons variant="arrow-drop-left" />
                            </div>
                        )}
                        <div className={styles.swiper} ref={bottomSwiperRef}>
                            {data?.items?.map((i, index) => (
                                <div
                                    ref={mergeRefs(bottomSwiperRefs(i, index))}
                                    key={i.id}
                                    className={`${styles.slideBottom} ${activeItem.value?.id === i.id ? styles.slideBottom_active : ''}`}
                                >
                                    {data?.type === 'img' && (
                                        <Image
                                            height="80px"
                                            width="56px"
                                            visibleDropdown={false}
                                            url={i.url}
                                            onClick={() => activeItem.set(i)}
                                            objectFit="cover"
                                        />
                                    )}
                                    {data?.type === 'video' && (
                                        <Video height="80px" width="56px" visibleDropdown={false} url={i.url} onClick={() => activeItem.set(i)} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {!inViewLastItemRef && (
                            <div className={styles.btnRight} onClick={() => scroll(220)}>
                                <Icons variant="arrow-drop-right" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhotoVideoSwiperView;
