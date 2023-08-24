import React from 'react';

import Swiper from '../../../../swiper';
import styles from '../../../../swiper/ui/base/styles.module.scss';
import { ImagesSwiperProps } from '../../types';
import Image from '../base';

function ImagesSwiper(props: ImagesSwiperProps) {
    const { items, visible, closeClick, initialSlide = 1 } = props;
    if (!items?.length) return null;
    return (
        <Swiper visible={visible} initialSlide={initialSlide} closeClick={closeClick}>
            {items.map((i) => (
                <Swiper.Slide key={i.id} className={styles.swiperSlide}>
                    <Image url={i.url} borderRadius={false} height="20%" width="auto" />
                </Swiper.Slide>
            ))}
        </Swiper>
    );
}
export default ImagesSwiper;
