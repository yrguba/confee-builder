import React from 'react';

import Swiper from '../../../../swiper';
import styles from '../../../../swiper/ui/base/styles.module.scss';
import { VideoSwiperProps } from '../../types';
import VideoPlayerWithControls from '../with-controls';

function VideoSwiper(props: VideoSwiperProps) {
    const { items, visible, closeClick, initialSlide = 1 } = props;
    if (!items?.length) return null;
    return (
        <Swiper visible={visible} initialSlide={initialSlide} closeClick={closeClick}>
            {items.map((i) => (
                <Swiper.Slide key={i.id} className={styles.swiperSlide}>
                    <VideoPlayerWithControls url={i.url} />
                </Swiper.Slide>
            ))}
        </Swiper>
    );
}
export default VideoSwiper;
