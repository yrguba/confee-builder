import { ForwardRefExoticComponent } from 'react';

import * as NavbarTypes from './types';
import Base from './ui/base';
import Responsive from './ui/responsive';
import WithLine from './ui/with-line';

type CompoundedComponent = ForwardRefExoticComponent<NavbarTypes.BaseNavbarProps> & {
    Responsive: typeof Responsive;
    WithLine: typeof WithLine;
};

const Navbar = Base as CompoundedComponent;

Navbar.Responsive = Responsive;
Navbar.WithLine = WithLine;

export { NavbarTypes };
export default Navbar;
