import React, { ForwardRefExoticComponent } from 'react';

import AnimateBox from './animate-box';
import InternalBox from './box';
import { BoxProps } from './types';

type CompoundedComponent = ForwardRefExoticComponent<BoxProps> & {
    Animate: typeof AnimateBox;
};

const Box = InternalBox as CompoundedComponent;

Box.Animate = AnimateBox;

export default Box;
