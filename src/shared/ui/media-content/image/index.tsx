import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Card from './ui/card';
import List from './ui/list';
import Swiper from './ui/swiper';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseImageProps> & {
    List: typeof List;
    Swiper: typeof Swiper;
    Card: typeof Card;
};

const Image = Base as CompoundedComponent;

Image.List = List;
Image.Swiper = Swiper;
Image.Card = Card;
export { Types };
export default Image;
