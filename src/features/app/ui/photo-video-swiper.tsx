import { emit, listen } from '@tauri-apps/api/event';
import React, { useEffect } from 'react';

import { appStore, PhotoVideoSwiperView } from 'entities/app';
import usePhotoVideoSwiper from 'entities/app/lib/usePhotoVideoSwiper';

import { useRouter } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const { params } = useRouter();

    const swiper = usePhotoVideoSwiper();
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();

    useEffect(() => {}, []);

    return <PhotoVideoSwiperView items={[]} />;
}

export default PhotoVideoSwiper;
