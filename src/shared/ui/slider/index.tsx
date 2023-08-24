import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseSliderProps> & {};

const Slider = Base as CompoundedComponent;

export { Types };
export default Slider;
