import { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseCardProps> & {
    List: typeof List;
};

const Card = Base as CompoundedComponent;
Card.List = List;

export { Types };
export default Card;
