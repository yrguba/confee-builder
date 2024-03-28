import { LogicalPosition, PhysicalPosition, WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';

import { PhotoVideoSwiperView } from 'entities/app';

import usePhotoVideoSwiper from '../../../entities/app/lib/usePhotoVideoSwiper';
import { useRustServer } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const swiper = usePhotoVideoSwiper();

    return <PhotoVideoSwiperView close={swiper.close} />;
}

export default PhotoVideoSwiper;
