import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Dynamic from './ui/dynamic';
import Fixed from './ui/fixed';
import Menu from './ui/menu';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseDropdownProps> & {
    Dynamic: typeof Dynamic;
    Menu: typeof Menu;
    Fixed: typeof Fixed;
};

const Dropdown = Base as CompoundedComponent;

Dropdown.Dynamic = Dynamic;
Dropdown.Menu = Menu;
Dropdown.Fixed = Fixed;
export { Types };
export default Dropdown;
