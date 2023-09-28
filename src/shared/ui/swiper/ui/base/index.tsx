import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useUnmount } from 'react-use';
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import styles from './styles.module.scss';
import { useCallbackRef } from '../../../../hooks';
import Box from '../../../box';
import Button from '../../../button';
import Icons from '../../../icons';
import { BaseSwiperProps } from '../../types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function BaseSwiper(props: BaseSwiperProps) {
    const { children, visible, closeClick, initialSlide = 1, ...swiperDefault } = props;
    const swiper_root = document.querySelector('#swiper-root');

    const onSwiper = (swiper: SwiperClass) => {
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

    return swiper_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={visible} className={styles.wrapper}>
                  <Button.Circle className={styles.closeBtn} onClick={closeClick}>
                      <Icons variant="close" />
                  </Button.Circle>
                  <Swiper
                      style={{
                          cursor: swiperDefault.allowTouchMove ? 'grab' : 'default',
                          // @ts-ignore
                          '--swiper-navigation-color': 'var(--text-action)',
                          '--swiper-pagination-color': 'var(--text-action)',
                      }}
                      // spaceBetween={10}
                      navigation
                      initialSlide={initialSlide}
                      modules={[FreeMode, Navigation]}
                      className={styles.mySwiper}
                      {...swiperDefault}
                      onSwiper={onSwiper}
                  >
                      {children}
                  </Swiper>
              </Box.Animated>,
              swiper_root
          )
        : null;
}

export default BaseSwiper;
