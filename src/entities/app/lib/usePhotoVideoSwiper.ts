import { LogicalPosition, PhysicalPosition, WebviewWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useRouter, useRustServer } from 'shared/hooks';

import { Modal } from '../../../shared/ui';
import { appStore } from '../index';

type Props = {
    onClose: () => void;
};

function usePhotoVideoSwiper(props?: Props) {
    const { useWebview, socket, rustIsRunning } = useRustServer();
    const swiperView = useWebview('photo_video_swiper');
    const { navigate } = useRouter();
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();

    useEffect(() => {
        swiperView.listen('close-requested', () => {
            swiperView.view?.hide();
            props?.onClose();
        });
    }, []);

    const show = (data: appTypes.PhotoAndVideoSwiperType) => {
        if (rustIsRunning) {
            swiperView?.view?.show().then(() => {
                socket.emit('photo_video_swiper', 'photoVideoSwiperData', data);
            });
        } else {
            navigate('/photo_video_swiper');
            photoAndVideoFromSwiper.set(data);
        }
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    return { show, socket };
}
export default usePhotoVideoSwiper;
