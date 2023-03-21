import React, { ForwardRefExoticComponent } from 'react';

import * as IconsTypes from './types';
import { ArrowAnimated } from './ui/animated';
import Base from './ui/base';
import Logo from './ui/logo';

type CompoundedComponent = ForwardRefExoticComponent<IconsTypes.BaseIconsProps> & {
    Logo: typeof Logo;
    ArrowAnimated: typeof ArrowAnimated;
};

const Icons = Base as CompoundedComponent;

Icons.Logo = Logo;
Icons.ArrowAnimated = ArrowAnimated;

export { IconsTypes };
export default Icons;
