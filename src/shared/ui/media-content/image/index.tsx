import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';
import Swiper from './ui/swiper';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseImageProps> & {
    List: typeof List;
    Swiper: typeof Swiper;
};

const Image = Base as CompoundedComponent;

Image.List = List;
Image.Swiper = Swiper;
export { Types };
export default Image;
