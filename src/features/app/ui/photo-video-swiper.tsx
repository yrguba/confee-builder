import { WebviewWindow } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';

import { PhotoVideoSwiperView } from 'entities/app';

import usePhotoVideoSwiper from '../../../entities/app/lib/usePhotoVideoSwiper';
import { useEasyState, useRustServer } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const { socket } = usePhotoVideoSwiper();
    const dataInLs = localStorage.getItem('a');
    const items = useEasyState(dataInLs ? JSON.parse(dataInLs) : []);

    useEffect(() => {
        socket.listen<any>('main', 'photoVideoSwiperData', (data) => {
            localStorage.setItem('a', JSON.stringify(data.items));
            items.set(data.items);
        });
    }, []);

    return <PhotoVideoSwiperView items={items.value} />;
}

export default PhotoVideoSwiper;
