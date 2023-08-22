import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import WithLine from './ui/with-line';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseTabBarProps> & {
    WithLine: typeof WithLine;
};

const TabBar = Base as CompoundedComponent;
TabBar.WithLine = WithLine;

export { Types };
export default TabBar;
