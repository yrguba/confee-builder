import { LogicalPosition, PhysicalPosition, WebviewWindow, WindowOptions } from '@tauri-apps/api/window';
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
            swiperView.close();
            // swiperView.view?.hide();
            props?.onClose();
        });
    }, []);

    const show = (data: appTypes.PhotoAndVideoSwiperType) => {
        photoAndVideoFromSwiper.set(data);
        console.log(swiperView?.view);
        if (rustIsRunning) {
            swiperView.create({ url: '/photo_video_swiper', title: 'Просмотр медиа' }, !photoAndVideoFromSwiper.value);
            // swiperView?.view?.show().then(() => {
            //     socket.emit('photo_video_swiper', 'photoVideoSwiperData', data);
            // });
        } else {
            navigate('/photo_video_swiper');
        }
    };

    const create = () => {
        swiperView.create({ url: '/photo_video_swiper', title: 'Просмотр медиа' }, !photoAndVideoFromSwiper.value);
    };

    const close = () => {
        swiperView?.view?.hide();
    };

    return { show, create, socket, close };
}
export default usePhotoVideoSwiper;
