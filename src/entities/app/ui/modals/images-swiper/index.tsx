import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BaseTypes } from 'shared/types';
import { Image, Modal } from 'shared/ui';

import styles from './styles.module.scss';
import { appTypes } from '../../../index';
import { ImagesSwiperProps } from '../../../model/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = ImagesSwiperProps & BaseTypes.Statuses;

function ImagesSwiperModal(props: Props) {
    const { images, startIndex = 1 } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(startIndex);

    const modal = Modal.use<any>('');
    const onSwiper = (swiper: any) => {
        setCurrentSlide(swiper.activeIndex + 1);
    };

    return images.length ? (
        <Modal {...modal}>
            <div className={styles.wrapper}>
                {/* <div className={styles.title}>wdwadw</div> */}
                <Swiper
                    initialSlide={startIndex}
                    onSlideChange={onSwiper}
                    spaceBetween={10}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.swiperTop}
                >
                    {images.map((image, index) => (
                        <SwiperSlide className={`${styles.swiperSlide} ${image.length > 1 && styles.swiperSlide_withBottom}`} key={index}>
                            <Image img={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {images.length > 1 && (
                    <Swiper
                        initialSlide={startIndex}
                        onSwiper={(val) => setThumbsSwiper(val)}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode
                        watchSlidesProgress
                        modules={[FreeMode, Navigation, Thumbs]}
                        className={styles.swiperBottom}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide className={styles.swiperSlide__bottom} key={index}>
                                <Image img={image} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </Modal>
    ) : null;
}

export default ImagesSwiperModal;
