import { WebviewWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useRustServer } from 'shared/hooks';

import { appStore } from '../index';

function usePhotoVideoSwiper() {
    const { useWebview, events } = useRustServer();

    const swiperView = useWebview('photo_video_swiper');

    useEffect(() => {
        swiperView.listen('close-requested', () => {
            swiperView.view?.hide();
        });
        // WebviewWindow.getByLabel('main')?.listen('photoVideoSwiperData', (e) => {
        //     alert(e.payload);
        //     alert(e.payload);
        // });
    }, []);

    const open = (data: appTypes.PhotoAndVideoSwiperType) => {
        if (swiperView.isOpen()) {
            swiperView?.view?.show();
            swiperView.view?.emit('photoVideoSwiperData', { m: data });
        } else {
            return swiperView.open({ path: `/photo_video_swiper`, title: 'Просмотр медиа' }).then((r) => {
                swiperView.view?.emit('photoVideoSwiperData', { m: data });
            });
        }
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    return { open, close };
}
export default usePhotoVideoSwiper;
