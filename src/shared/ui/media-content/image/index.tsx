import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseImageProps> & {
    List: typeof List;
};

const Image = Base as CompoundedComponent;

Image.List = List;

export { Types };
export default Image;
