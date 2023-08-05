import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Circle from './ui/circle';
import Link from './ui/link';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseButtonProps> & {
    Link: typeof Link;
    Circle: typeof Circle;
};

const Button = Base as CompoundedComponent;

Button.Circle = Circle;
Button.Link = Link;

export { Types };
export default Button;
