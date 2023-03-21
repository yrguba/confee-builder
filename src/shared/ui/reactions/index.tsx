import React, { ForwardRefExoticComponent } from 'react';

import * as ReactionsTypes from './types';
import Base from './ui/base';
import Counter from './ui/counter';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<ReactionsTypes.BaseReactionsProps> & {
    List: typeof List;
    Counter: typeof Counter;
};

const Reactions = Base as CompoundedComponent;

Reactions.List = List;
Reactions.Counter = Counter;

export { ReactionsTypes };
export default Reactions;
