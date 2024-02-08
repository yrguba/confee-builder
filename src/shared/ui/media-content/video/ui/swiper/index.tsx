import React from 'react';

import { useEasyState } from '../../../../../hooks';
import Swiper from '../../../../swiper';
import { VideoSwiperProps } from '../../types';
import VideoPlayerWithControls from '../with-controls';

function VideoSwiper(props: VideoSwiperProps) {
    const { items, visible, closeClick, initialSlide = 1 } = props;
    const reset = useEasyState(false);
    if (!items?.length) return null;
    return (
        <Swiper
            onNavigationNext={() => reset.toggle()}
            onNavigationPrev={() => reset.toggle()}
            allowTouchMove={false}
            visible={visible}
            initialSlide={initialSlide}
            closeClick={closeClick}
        >
            {items.map((i) => (
                <Swiper.Slide key={i.id}>
                    <VideoPlayerWithControls {...i} reset={reset.value} />
                </Swiper.Slide>
            ))}
        </Swiper>
    );
}
export default VideoSwiper;
