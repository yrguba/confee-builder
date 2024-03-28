import React, { useEffect } from 'react';

import { appStore, PhotoVideoSwiperView } from 'entities/app';
import usePhotoVideoSwiper from 'entities/app/lib/usePhotoVideoSwiper';

function PhotoVideoSwiper() {
    const swiper = usePhotoVideoSwiper();
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();

    return <PhotoVideoSwiperView data={photoAndVideoFromSwiper.value} />;
}

export default PhotoVideoSwiper;
