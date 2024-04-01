import React, { useEffect, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import styles from './styles.module.scss';
import { useEasyState, useFs } from '../../../../shared/hooks';
import { Button, Card, ContextMenu, Icons, Image, Video } from '../../../../shared/ui';
import VideoPlayer from '../../../../shared/ui/media-content/video';
import VideoPlayerWithControls from '../../../../shared/ui/media-content/video/ui/with-controls';
import { appService } from '../../index';
import { PhotoAndVideoSwiperType } from '../../model/types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = {
    data?: PhotoAndVideoSwiperType;
    back: () => void;
    downloads: (all: boolean, index: number | null) => void;
    deleteMessage: () => void;
    forward: () => void;
};

function PhotoVideoSwiperView(props: Props) {
    const { forward, data, back, downloads, deleteMessage } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [swiper, setSwiper] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<any>(data?.startIndex || 0);
    const fullScreen = useEasyState(false);
    const visibleContextMenu = useEasyState(false);

    const actions = [
        { id: 0, icon: <Icons variant="upload" />, onClick: () => visibleContextMenu.set(true) },
        { id: 1, icon: <Icons variant="redirect" />, onClick: forward },
        { id: 1, icon: <Icons variant="delete" />, onClick: deleteMessage },
    ];

    const contextMenuItems = [
        {
            id: 0,
            title: 'Все фото',
            callback: () => {
                downloads(true, null);
                visibleContextMenu.set(false);
            },
        },
        {
            id: 1,
            title: 'Только это',
            callback: () => {
                downloads(true, activeIndex);
                visibleContextMenu.set(false);
            },
        },
    ];

    const onSwiper = (swiper: SwiperClass) => {
        setSwiper(swiper);
        swiper
            ? window.addEventListener('keydown', function (event) {
                  switch (event.code) {
                      case 'ArrowRight':
                          return swiper?.slideNext(400);
                      case 'ArrowLeft':
                          return swiper?.slidePrev(400);
                  }
              })
            : window.removeEventListener('keydown', () => '');
    };

    useEffect(() => {
        swiper?.slideTo(data?.startIndex || 0);
    }, [data?.startIndex]);

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
            {!appService.tauriIsRunning && (
                <div className={styles.backIcon} onClick={back}>
                    <Icons variant="close" />
                </div>
            )}
            <Swiper
                onActiveIndexChange={(e) => {
                    setActiveIndex(e.activeIndex);
                }}
                allowTouchMove={false}
                onSwiper={onSwiper}
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiperTop}
                style={{ margin: fullScreen.value ? '0' : '20px 0' }}
            >
                {data?.items?.map((i, index) => (
                    <SwiperSlide key={i.id}>
                        {data.type === 'img' && <Image visibleDropdown={false} url={i.url} objectFit="contain" />}
                        {data.type === 'video' && (
                            <VideoPlayerWithControls pause={index !== activeIndex} clickFull={() => fullScreen.toggle()} visibleDropdown={false} url={i.url} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
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
                {multiple && data.type !== 'video' && (
                    <div className={styles.swiperContainer}>
                        <Swiper
                            allowTouchMove={false}
                            onSwiper={setThumbsSwiper}
                            onActiveIndexChange={(e) => {
                                setActiveIndex(e.activeIndex);
                            }}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode
                            watchSlidesProgress
                            modules={[FreeMode, Navigation, Thumbs]}
                            className={styles.swiperBottom}
                        >
                            {data?.items?.map((i, index) => (
                                <SwiperSlide key={i.id} className={`${styles.sliderBottom} ${activeIndex === index ? styles.sliderBottom_active : ''}`}>
                                    {data?.type === 'img' && <Image visibleDropdown={false} url={i.url} onClick={() => ''} />}
                                    {data?.type === 'video' && <Video height="50px" width="100px" visibleDropdown={false} url={i.url} />}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhotoVideoSwiperView;
