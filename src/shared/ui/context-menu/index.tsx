import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseContextMenuProps> & {};

const ContextMenu = Base as CompoundedComponent;

export { Types };
export default ContextMenu;
