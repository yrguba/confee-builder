import { WebviewWindow } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';

import { PhotoVideoSwiperView } from 'entities/app';

import usePhotoVideoSwiper from '../../../entities/app/lib/usePhotoVideoSwiper';
import { useRustServer } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const { socket } = usePhotoVideoSwiper();

    useEffect(() => {
        socket.listen<{ m: string }>('photoVideoSwiperData', (data) => {
            alert('wd');
            console.log(data);
        });
    }, []);
    return <PhotoVideoSwiperView items={[]} />;
}

export default PhotoVideoSwiper;
