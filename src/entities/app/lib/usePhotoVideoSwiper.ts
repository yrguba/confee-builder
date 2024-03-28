import { LogicalSize, currentMonitor, PhysicalSize, PhysicalPosition, LogicalPosition, primaryMonitor, WindowOptions, Monitor } from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { useRustServer, useStorage } from 'shared/hooks';

import { appStore } from '../index';

// type OpenSwiperProps = {
//     items: {
//         id: number;
//         url: string;
//     };
// };

function usePhotoVideoSwiper() {
    const { useWebview } = useRustServer();
    const swiperView = useWebview('photo_video_swiper');

    const open = () => {
        swiperView?.view?.show();
    };

    const close = () => {
        currentMonitor().then((res) => {
            if (res?.size.width && res.size.height) {
                swiperView.view?.setPosition(new PhysicalPosition(res.position.x, 0));
                swiperView.view?.setMaxSize(new PhysicalSize(res?.size.width - 11, res.size.height - 11));
            }
        });
        swiperView?.view?.hide();
    };

    const toggleFullScreen = () => {
        swiperView.view?.toggleMaximize();
    };

    const fullScreen = () => {
        swiperView.view?.maximize();
    };
    return { open, close, toggleFullScreen, fullScreen };
}
export default usePhotoVideoSwiper;
