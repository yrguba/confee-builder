import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Card from './ui/card';
import List from './ui/list';
import WithControls from './ui/with-controls';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseVideoProps> & {
    WithControls: typeof WithControls;
    List: typeof List;
    Card: typeof Card;
};

const VideoPlayer = Base as CompoundedComponent;

VideoPlayer.List = List;
VideoPlayer.Card = Card;
VideoPlayer.WithControls = WithControls;
export { Types };
export default VideoPlayer;
