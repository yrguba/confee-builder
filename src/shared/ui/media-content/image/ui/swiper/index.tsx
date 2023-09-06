import React from 'react';

import Swiper from '../../../../swiper';
import styles from '../../../../swiper/ui/base/styles.module.scss';
import { ImagesSwiperProps } from '../../types';
import Image from '../base';

function ImagesSwiper(props: ImagesSwiperProps) {
    const { items, visible, closeClick, initialSlide = 1 } = props;
    if (!items?.length) return null;
    return (
        <Swiper allowTouchMove visible={visible} initialSlide={initialSlide} closeClick={closeClick}>
            {items.map((i) => (
                <Swiper.Slide key={i.id}>
                    <Image objectFit="contain" url={i.url} borderRadius={false} />
                </Swiper.Slide>
            ))}
        </Swiper>
    );
}
export default ImagesSwiper;
