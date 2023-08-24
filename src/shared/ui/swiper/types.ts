import { JSX } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';

import { BaseTypes } from 'shared/types';

export type BaseSwiperProps = {
    children: JSX.Element | JSX.Element[];
    visible: boolean;
    closeClick: () => void;
    initialSlide?: number;
    allowTouchMove?: boolean;
} & BaseTypes.Statuses &
    SwiperProps;

export type { SwiperProps };
