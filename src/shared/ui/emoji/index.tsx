import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Counter from './ui/counter';
import Item from './ui/item';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseEmojiProps> & {
    Counter: typeof Counter;
    Item: typeof Item;
};

const Emoji = Base as CompoundedComponent;

Emoji.Counter = Counter;
Emoji.Item = Item;

export { Types };
export default Emoji;
