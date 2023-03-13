import React, { ForwardRefExoticComponent } from 'react';

import * as IconsTypes from './types';
import Base from './ui/base';
import Logo from './ui/logo';

type CompoundedComponent = ForwardRefExoticComponent<IconsTypes.BaseIconsProps> & {
    Logo: typeof Logo;
};

const Icons = Base as CompoundedComponent;

Icons.Logo = Logo;

export { IconsTypes };
export default Icons;
