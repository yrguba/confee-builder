import { LogicalPosition, PhysicalPosition, WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';

import { PhotoVideoSwiperView } from 'entities/app';

import usePhotoVideoSwiper from '../../../entities/app/lib/usePhotoVideoSwiper';
import { useRustServer } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const swiper = usePhotoVideoSwiper();

    return (
        <PhotoVideoSwiperView minimize={swiper.minimize} toggleFullScreen={swiper.toggleFullScreen} close={swiper.close} isFullScreen={swiper.isFullScreen} />
    );
}

export default PhotoVideoSwiper;
