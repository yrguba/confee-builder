import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

import styles from './styles.module.scss';
import { useEasyState, useFs } from '../../../../../shared/hooks';
import { Button, Card, ContextMenu, Icons, Image, Video } from '../../../../../shared/ui';
import VideoPlayer from '../../../../../shared/ui/media-content/video';
import VideoPlayerWithControls from '../../../../../shared/ui/media-content/video/ui/with-controls';
import { appService } from '../../../index';
import { PhotoAndVideoSwiperType, PhotoAndVideoSwiperItemsType } from '../../../model/types';

type Props = {
    data?: PhotoAndVideoSwiperType;
    close: () => void;
    downloads: (items: any) => void;
    deleteMessage: () => void;
    forward: () => void;
};

function PhotoVideoSwiperView(props: Props) {
    const { forward, data, close, downloads, deleteMessage } = props;

    const activeItem = useEasyState<PhotoAndVideoSwiperItemsType | null>(null);
    const fullScreen = useEasyState(false);
    const visibleContextMenu = useEasyState(false);

    const actions = [
        { id: 0, icon: <Icons variant="upload" />, onClick: () => visibleContextMenu.set(true) },
        { id: 1, icon: <Icons variant="redirect" />, onClick: forward },
        { id: 2, icon: <Icons variant="delete" />, onClick: deleteMessage },
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

    // const onSwiper = (swiper: SwiperClass) => {
    //     setSwiper(swiper);
    //     swiper
    //         ? window.addEventListener('keydown', function (event) {
    //               switch (event.code) {
    //                   case 'ArrowRight':
    //                       return swiper?.slideNext(400);
    //                   case 'ArrowLeft':
    //                       return swiper?.slidePrev(400);
    //               }
    //           })
    //         : window.removeEventListener('keydown', () => '');
    // };
    //
    useEffect(() => {
        const found = data?.items.find((i, index) => index === data?.startIndex);
        found && activeItem.set(found);
    }, [data?.startIndex]);
    console.log(activeItem.value);
    const multiple = data?.items?.length && data.items.length > 1;

    return (
        <div className={styles.wrapper}>
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
                {activeItem.value && (
                    <div className={styles.slideTop}>
                        {data?.type === 'img' && <Image height="100%" visibleDropdown={false} url={activeItem.value?.url} objectFit="contain" />}
                        {/* {data?.type === 'video' && ( */}
                        {/*    <VideoPlayerWithControls pause={index !== activeIndex} clickFull={() => fullScreen.toggle()} visibleDropdown={false} url={i.url} /> */}
                        {/* )} */}
                    </div>
                )}
            </div>
            {data?.type === 'img' && (
                <div className={styles.fullScreen} style={{ bottom: fullScreen.value ? 30 : 290 }} onClick={fullScreen.toggle}>
                    <Icons.Player variant="full" />
                </div>
            )}
            <div className={`${styles.footer} ${fullScreen.value ? styles.footer_hidden : ''}`}>
                <div className={styles.card}>
                    <Card title={data?.description.title} subtitle={data?.description.subtitle} img={data?.description.avatar} />
                </div>
                <div className={styles.actions}>
                    {actions.map((i) => (
                        <div key={i.id} className={styles.item} onClick={i.onClick}>
                            {i.icon}
                        </div>
                    ))}
                </div>
                {multiple && (
                    <div className={styles.swiperContainer}>
                        {data?.items?.map((i, index) => (
                            <div key={i.id} className={`${styles.slideBottom} ${activeItem.value?.id === i.id ? styles.slideBottom_active : ''}`}>
                                {data?.type === 'img' && (
                                    <Image height="80px" width="56px" visibleDropdown={false} url={i.url} onClick={() => activeItem.set(i)} objectFit="cover" />
                                )}
                                {data?.type === 'video' && <Video height="80px" width="56px" visibleDropdown={false} url={i.url} />}
                            </div>
                        ))}
                        {/* <Swiper */}
                        {/*    allowTouchMove={false} */}
                        {/*    onSwiper={setThumbsSwiper} */}
                        {/*    onActiveIndexChange={(e) => { */}
                        {/*        setActiveIndex(e.activeIndex); */}
                        {/*    }} */}
                        {/*    spaceBetween={10} */}
                        {/*    slidesPerView={4} */}
                        {/*    freeMode */}
                        {/*    watchSlidesProgress */}
                        {/*    modules={[FreeMode, Navigation, Thumbs]} */}
                        {/*    className={styles.swiperBottom} */}
                        {/* > */}
                        {/*    {data?.items?.map((i, index) => ( */}
                        {/*        <SwiperSlide key={i.id} className={`${styles.sliderBottom} ${activeIndex === index ? styles.sliderBottom_active : ''}`}> */}
                        {/*            {data?.type === 'img' && <Image visibleDropdown={false} url={i.url} onClick={() => ''} />} */}
                        {/*            {data?.type === 'video' && <Video height="50px" width="100px" visibleDropdown={false} url={i.url} />} */}
                        {/*        </SwiperSlide> */}
                        {/*    ))} */}
                        {/* </Swiper> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhotoVideoSwiperView;
