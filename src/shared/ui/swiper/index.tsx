import React, { ForwardRefExoticComponent } from 'react';
import { SwiperSlide } from 'swiper/react';

import * as Types from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseSwiperProps> & {
    Slide: typeof SwiperSlide;
};

const Swiper = Base as CompoundedComponent;
Swiper.Slide = SwiperSlide;
export { Types };
export default Swiper;
