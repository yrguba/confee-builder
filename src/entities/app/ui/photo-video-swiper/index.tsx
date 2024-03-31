import React, { useEffect, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import styles from './styles.module.scss';
import { Button, Icons, Image } from '../../../../shared/ui';
import { PhotoAndVideoSwiperItemsType, PhotoAndVideoSwiperType } from '../../model/types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = {
    data: PhotoAndVideoSwiperType;
};

function PhotoVideoSwiperView(props: Props) {
    const { data } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [swiper, setSwiper] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<any>(data.startIndex || 0);

    const onSwiper = (swiper: SwiperClass) => {
        setSwiper(swiper);
        swiper
            ? window.addEventListener('keydown', function (event) {
                  switch (event.code) {
                      case 'ArrowRight':
                          return swiper?.slideNext(400);
                      case 'ArrowLeft':
                          return swiper?.slidePrev(400);
                  }
              })
            : window.removeEventListener('keydown', () => '');
    };

    useEffect(() => {
        swiper?.slideTo(data.startIndex || 0);
    }, [data.startIndex]);

    return (
        <div className={styles.wrapper}>
            <Swiper
                onActiveIndexChange={(e) => {
                    setActiveIndex(e.activeIndex);
                }}
                onSwiper={onSwiper}
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiperTop}
            >
                {data.items?.map((i) => (
                    <SwiperSlide key={i.id}>
                        <Image visibleDropdown={false} url={i.url} objectFit="contain" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.footer}>
                <div className={styles.swiperContainer}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode
                        watchSlidesProgress
                        modules={[FreeMode, Navigation, Thumbs]}
                        className={styles.swiperBottom}
                    >
                        {data.items?.map((i, index) => (
                            <SwiperSlide key={i.id} className={`${styles.sliderBottom} ${activeIndex === index ? styles.sliderBottom_active : ''}`}>
                                <Image visibleDropdown={false} url={i.url} onClick={() => ''} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default PhotoVideoSwiperView;
