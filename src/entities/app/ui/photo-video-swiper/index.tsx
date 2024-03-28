import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import styles from './styles.module.scss';
import { Button, Icons, Image } from '../../../../shared/ui';
import { PhotoAndVideoSwiperItemsType } from '../../model/types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = {
    items: PhotoAndVideoSwiperItemsType[];
};

function PhotoVideoSwiperView(props: Props) {
    const { items } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    console.log(items);
    return (
        <div className={styles.wrapper}>
            wadwdd
            <Swiper spaceBetween={10} navigation thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} className={styles.swiperTop}>
                {items?.map((i) => (
                    <SwiperSlide key={i.id}>
                        wadwd
                        <Image url={i.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                // onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {items?.map((i) => (
                    <SwiperSlide key={i.id}>
                        <Image url={i.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default PhotoVideoSwiperView;
