import React, { useEffect, useState } from 'react';

import { appService, appStore, PhotoVideoSwiperView } from 'entities/app';
import usePhotoVideoSwiper from 'entities/app/lib/usePhotoVideoSwiper';

import { useRouter } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const dataInLs = localStorage.getItem('photoVideoSwiperData');
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const [data, setData] = useState(dataInLs ? JSON.parse(dataInLs) : null);
    const { navigate } = useRouter();
    const { socket } = usePhotoVideoSwiper({
        onClose: () => {
            setData(null);
            localStorage.removeItem('photoVideoSwiperData');
        },
    });

    useEffect(() => {
        socket.listen<any>('main', 'photoVideoSwiperData', (data) => {
            setData(data);
            localStorage.setItem('photoVideoSwiperData', JSON.stringify(data));
        });
    }, []);

    return <PhotoVideoSwiperView data={data || photoAndVideoFromSwiper.value} back={() => navigate(-1)} />;
}

export default PhotoVideoSwiper;
