import React from 'react';
import ReactDOM from 'react-dom';
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';
import Box from '../../../box';
import Button from '../../../button';
import Icons from '../../../icons';
import { BaseSwiperProps } from '../../types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function BaseSwiper(props: BaseSwiperProps) {
    const { children, visible, closeClick, initialSlide = 1 } = props;
    const swiper_root = document.querySelector('#swiper-root');
    return swiper_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={visible} className={styles.wrapper}>
                  <Button.Circle className={styles.closeBtn} onClick={closeClick}>
                      <Icons variant="close" />
                  </Button.Circle>
                  <Swiper
                      style={{
                          // @ts-ignore
                          '--swiper-navigation-color': 'var(--text-action)',
                          '--swiper-pagination-color': 'var(--text-action)',
                      }}
                      // spaceBetween={10}
                      navigation
                      initialSlide={initialSlide}
                      modules={[FreeMode, Navigation]}
                      className={styles.mySwiper}
                  >
                      {children}
                  </Swiper>
              </Box.Animated>,
              swiper_root
          )
        : null;
}

export default BaseSwiper;
