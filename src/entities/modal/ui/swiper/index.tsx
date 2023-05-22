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
    startWithIt: number;
} & BaseTypes.Statuses;

function SwiperModal(props: Props) {
    const { files, startWithIt = 1 } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(startWithIt);

    const onSwiper = (swiper: any) => {
        setCurrentSlide(swiper.activeIndex + 1);
    };

    return files.length ? (
        <div className={styles.wrapper}>
            {/* <div className={styles.title}>wdwadw</div> */}
            <Swiper
                initialSlide={startWithIt}
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
                    initialSlide={startWithIt}
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
