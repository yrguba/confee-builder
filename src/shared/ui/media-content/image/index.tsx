import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Card from './ui/card';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseImageProps> & {
    List: typeof List;

    Card: typeof Card;
};

const Image = Base as CompoundedComponent;

Image.List = List;

Image.Card = Card;
export { Types };
export default Image;
