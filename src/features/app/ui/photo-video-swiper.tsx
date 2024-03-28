import { WebviewWindow } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';

import { PhotoVideoSwiperView } from 'entities/app';

import usePhotoVideoSwiper from '../../../entities/app/lib/usePhotoVideoSwiper';
import { useRustServer } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const { useWebview, events } = useRustServer();
    const { close } = usePhotoVideoSwiper();

    useEffect(() => {
        WebviewWindow.getByLabel('main')?.listen('photoVideoSwiperData', (e) => {
            alert('wdad');
            console.log(e.payload);
        });
    }, []);
    return <PhotoVideoSwiperView items={[]} />;
}

export default PhotoVideoSwiper;
