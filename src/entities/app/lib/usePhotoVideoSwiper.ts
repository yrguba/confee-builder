import { LogicalPosition, PhysicalPosition, WebviewWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useRustServer } from 'shared/hooks';

import { appStore } from '../index';

function usePhotoVideoSwiper() {
    const { useWebview, socket } = useRustServer('photo_video_swiper');
    const swiperView = useWebview();

    useEffect(() => {
        swiperView.listen('close-requested', () => {
            swiperView.view?.hide();
        });
    }, []);

    const show = (data: appTypes.PhotoAndVideoSwiperType) => {
        swiperView.view?.innerPosition().then((pos) => {
            if (pos.y > 30000) {
                swiperView.view?.center();
            }
        });
        swiperView?.view?.show();
        socket.emit('photoVideoSwiperData', { m: data });
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    return { show, socket };
}
export default usePhotoVideoSwiper;
