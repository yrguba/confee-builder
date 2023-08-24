import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';
import Swiper from './ui/swiper';
import WithControls from './ui/with-controls';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseVideoPlayerProps> & {
    WithControls: typeof WithControls;
    List: typeof List;
    Swiper: typeof Swiper;
};

const VideoPlayer = Base as CompoundedComponent;

VideoPlayer.Swiper = Swiper;
VideoPlayer.List = List;
VideoPlayer.WithControls = WithControls;
export { Types };
export default VideoPlayer;
