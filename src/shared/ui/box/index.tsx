import { ForwardRefExoticComponent } from 'react';

import * as animationVariants from './animation-variants';
import * as Types from './types';
import Animated from './ui/animated';
import Base from './ui/base';
import Replace from './ui/replace';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseBoxProps> & {
    Animated: typeof Animated;
    Replace: typeof Replace;
};

const Box = Base as CompoundedComponent;

Box.Animated = Animated;
Box.Replace = Replace;
export { Types, animationVariants };
export default Box;
