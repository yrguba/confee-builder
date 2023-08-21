import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Circle from './ui/circle';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseButtonProps> & {
    Circle: typeof Circle;
};

const Button = Base as CompoundedComponent;

Button.Circle = Circle;

export { Types };
export default Button;
