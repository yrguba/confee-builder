import React, { useEffect, useState } from 'react';

import { PhotoVideoSwiperView } from 'entities/app';
import usePhotoVideoSwiper from 'entities/app/lib/usePhotoVideoSwiper';

function PhotoVideoSwiper() {
    const { socket } = usePhotoVideoSwiper();
    const dataInLs = localStorage.getItem('photoVideoSwiperData');

    const [data, setData] = useState(dataInLs ? JSON.parse(dataInLs) : null);
    useEffect(() => {
        socket.listen<any>('main', 'photoVideoSwiperData', (data) => {
            setData(data);
            localStorage.setItem('photoVideoSwiperData', JSON.stringify(data));
        });
    }, []);

    return <PhotoVideoSwiperView data={data} />;
}

export default PhotoVideoSwiper;
