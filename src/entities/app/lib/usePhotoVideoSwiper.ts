import { emit, listen } from '@tauri-apps/api/event';
import { WebviewWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useRustServer, useStorage } from 'shared/hooks';

import { getRandomString } from '../../../shared/lib';
import { appStore } from '../index';

function usePhotoVideoSwiper() {
    const { useWebview, invoker } = useRustServer();

    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();

    const swiperView = useWebview('photo_video_swiper');
    const isFullScreen = useEasyState(false);

    useEffect(() => {
        swiperView.listen('close-requested', () => {
            swiperView.close();
            // swiperView.view?.hide();
        });
        WebviewWindow.getByLabel('main')?.listen('click', () => {
            alert('click');
            // swiperView.view?.hide();
        });
    }, []);

    const open = (data: appTypes.PhotoAndVideoSwiperType) => {
        photoAndVideoFromSwiper.set(data);

        WebviewWindow.getByLabel('main')?.emit('click', { m: 'Tauri is awesome!' });
        // if (swiperView.isOpen()) {
        // swiperView?.view?.show();
        // } else {
        swiperView.open({ path: `/photo_video_swiper`, title: 'Просмотр медиа' }).then((r) => {});
        // }
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    return { open, close, items: photoAndVideoFromSwiper.value };
}
export default usePhotoVideoSwiper;
