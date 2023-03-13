import { ForwardRefExoticComponent } from 'react';

import * as NavbarTypes from './types';
import Base from './ui/base';
import Responsive from './ui/responsive';

type CompoundedComponent = ForwardRefExoticComponent<NavbarTypes.BaseNavbarProps> & {
    Responsive: typeof Responsive;
};

const Navbar = Base as CompoundedComponent;

Navbar.Responsive = Responsive;

export { NavbarTypes };
export default Navbar;
