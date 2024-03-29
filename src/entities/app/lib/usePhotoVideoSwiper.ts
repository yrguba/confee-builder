import { LogicalPosition, PhysicalPosition, WebviewWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useRustServer } from 'shared/hooks';

import { appStore } from '../index';

function usePhotoVideoSwiper() {
    const { useWebview, socket } = useRustServer();
    const swiperView = useWebview('photo_video_swiper');

    useEffect(() => {
        swiperView.listen('close-requested', () => {
            swiperView.view?.hide();
        });
    }, []);

    const show = (data: appTypes.PhotoAndVideoSwiperType) => {
        swiperView?.view?.show().then(() => {
            socket.emit('photo_video_swiper', 'photoVideoSwiperData', data);
        });
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    return { show, socket };
}
export default usePhotoVideoSwiper;
