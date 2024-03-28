import {
    LogicalSize,
    currentMonitor,
    PhysicalSize,
    PhysicalPosition,
    LogicalPosition,
    getCurrent,
    primaryMonitor,
    WindowOptions,
    Monitor,
} from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { useEasyState, useRustServer, useStorage } from 'shared/hooks';

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
    const isFullScreen = useEasyState(false);

    const open = () => {
        swiperView?.view?.show();
    };

    const close = () => {
        currentMonitor().then((res) => {
            if (res?.size.width && res.size.height) {
                const { width, height } = res.size;
                swiperView.view?.innerSize().then((viewSize) => {
                    if (viewSize.height + 6 > height && viewSize.width + 6 > width) {
                        swiperView.view?.setPosition(new PhysicalPosition(res.position.x, res.position.y));
                        swiperView.view?.setSize(new PhysicalSize(width, height));
                    }
                    swiperView?.view?.hide();
                });
            }
        });
    };

    const toggleFullScreen = () => {
        swiperView.view?.toggleMaximize();
    };

    const fullScreen = () => {
        // swiperView.view?.maximize();
    };

    const minimize = () => {
        console.log('wdwd');
        swiperView.view?.minimize();
    };

    useEffect(() => {
        // swiperView.listenOnce('resize', () => {
        //     currentMonitor().then((res) => {
        //         if (res?.size.width && res.size.height) {
        //             const { width, height } = res.size;
        //             swiperView.view?.innerSize().then((viewSize) => {
        //                 if (viewSize.height + 3 > height && viewSize.width + 3 > width) {
        //                     isFullScreen.set(true);
        //                     swiperView.view?.setResizable(false);
        //                     swiperView.view?.maximize();
        //                 } else {
        //                     isFullScreen.set(false);
        //                     swiperView.view?.setResizable(true);
        //                     swiperView.view?.setSize(new PhysicalSize(450, 650));
        //                 }
        //             });
        //         }
        //     });
        // });
    }, []);

    return { open, close, toggleFullScreen, fullScreen, minimize, isFullScreen: isFullScreen.value };
}
export default usePhotoVideoSwiper;
