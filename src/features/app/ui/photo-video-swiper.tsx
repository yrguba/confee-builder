import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';

import { PhotoVideoSwiperView } from 'entities/app';

import { useRustServer } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const { useWebview } = useRustServer();

    const { view } = useWebview('photo_video_swiper');

    const closeClick = () => {
        if (view) {
            view.hide();
        }
    };

    return <PhotoVideoSwiperView closeClick={closeClick} />;
}

export default PhotoVideoSwiper;
