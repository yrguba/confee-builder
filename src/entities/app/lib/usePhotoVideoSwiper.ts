import { useEffect } from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useRustServer, useStorage } from 'shared/hooks';

import { appStore } from '../index';

function usePhotoVideoSwiper() {
    const { useWebview } = useRustServer();

    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();

    const swiperView = useWebview('photo_video_swiper');
    const isFullScreen = useEasyState(false);

    useEffect(() => {
        swiperView.listen('close-requested', () => {
            swiperView.view?.hide();
        });
    }, []);

    const open = (data: appTypes.PhotoAndVideoSwiperType) => {
        photoAndVideoFromSwiper.set(data);
        console.log(appStore.getState().photoAndVideoFromSwiper);
        if (swiperView.isOpen()) {
            swiperView?.view?.show();
        } else {
            swiperView.open({ path: '/photo_video_swiper', title: 'Просмотр медиа' });
        }
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    const toggleFullScreen = () => {
        swiperView.view?.isFullscreen().then((r) => {
            swiperView.view?.setFullscreen(!r);
        });
    };

    const fullScreen = () => {
        swiperView.view?.setFullscreen(true);
    };

    const minimize = () => {
        swiperView.view?.minimize();
    };

    return { open, close, toggleFullScreen, fullScreen, minimize, isFullScreen: isFullScreen.value };
}
export default usePhotoVideoSwiper;
