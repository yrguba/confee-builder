import { ForwardRefExoticComponent } from 'react';

import * as animationVariants from './animation-variants';
import * as Types from './types';
import Animated from './ui/animated';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseBoxProps> & {
    Animated: typeof Animated;
};

const Box = Base as CompoundedComponent;

Box.Animated = Animated;

export { Types, animationVariants };
export default Box;
