import React, { ForwardRefExoticComponent } from 'react';

import * as IconsTypes from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<IconsTypes.BaseIconsProps> & {};

const Icons = Base as CompoundedComponent;

export { IconsTypes };
export default Icons;
