import { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseCardProps> & {};

const Card = Base as CompoundedComponent;

export { Types };
export default Card;
