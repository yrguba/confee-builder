import React, { ForwardRefExoticComponent } from 'react';

import * as BoxTypes from './types';
import Animated from './ui/animated';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<BoxTypes.BaseBoxProps> & {
    Animated: typeof Animated;
};

const Box = Base as CompoundedComponent;

Box.Animated = Animated;

export { BoxTypes };
export default Box;
