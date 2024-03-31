import React, { useEffect, useState } from 'react';

import { appService, appStore, PhotoVideoSwiperView } from 'entities/app';
import usePhotoVideoSwiper from 'entities/app/lib/usePhotoVideoSwiper';

import { useFs, useRouter } from '../../../shared/hooks';

function PhotoVideoSwiper() {
    const { navigate } = useRouter();
    const fs = useFs();
    const dataInLs = localStorage.getItem('photoVideoSwiperData');
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const [data, setData] = useState(dataInLs ? JSON.parse(dataInLs) : null);

    const currentData = data || photoAndVideoFromSwiper.value;

    const { socket } = usePhotoVideoSwiper({
        onClose: () => {
            setData(null);
            localStorage.removeItem('photoVideoSwiperData');
        },
    });

    const downloads = (all: boolean, index: number | null) => {
        if (all) {
            Promise.all(
                currentData.items.map(async (i: any) => {
                    fs.downLoadAndSave({ baseDir: 'download', url: i.url, fileName: i.name, progressCallback: (percent) => '' });
                })
            );
        } else {
            const found = currentData.items.find((i: any, ind: number) => ind === index);
            found && fs.downLoadAndSave({ baseDir: 'download', url: found.url, fileName: found.name, progressCallback: (percent) => '' });
        }
    };

    useEffect(() => {
        socket.listen<any>('main', 'photoVideoSwiperData', (data) => {
            setData(data);
            localStorage.setItem('photoVideoSwiperData', JSON.stringify(data));
        });
    }, []);

    return <PhotoVideoSwiperView data={currentData} back={() => navigate(-1)} downloads={downloads} />;
}

export default PhotoVideoSwiper;
