import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Counter from './ui/counter';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseEmojiProps> & {
    List: typeof List;
    Counter: typeof Counter;
};

const Emoji = Base as CompoundedComponent;

Emoji.List = List;
Emoji.Counter = Counter;

export { Types };
export default Emoji;
