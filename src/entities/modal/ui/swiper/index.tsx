import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { http } from 'shared/constanst';
import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageTypes } from '../../../message';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = {
    files: MessageTypes.File[];
} & BaseTypes.Statuses;

function SwiperModal(props: Props) {
    const { files } = props;

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(1);

    const onSwiper = (swiper: any) => {
        setCurrentSlide(swiper.activeIndex + 1);
    };

    return files.length ? (
        <div className={styles.wrapper}>
            {/* <div className={styles.title}>wdwadw</div> */}
            <Swiper
                onSlideChange={onSwiper}
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiperTop}
            >
                {files.map((file, index) => (
                    <SwiperSlide className={`${styles.swiperSlide} ${files.length > 1 && styles.swiperSlide_withBottom}`} key={index}>
                        <Image img={file.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {files.length > 1 && (
                <Swiper
                    onSwiper={(val) => setThumbsSwiper(val)}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.swiperBottom}
                >
                    {files.map((file, index) => (
                        <SwiperSlide className={styles.swiperSlide__bottom} key={index}>
                            <Image img={file.url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    ) : null;
}

export default SwiperModal;
