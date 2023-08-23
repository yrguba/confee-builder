import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseVideoPlayerProps> & {
    List: typeof List;
};

const VideoPlayer = Base as CompoundedComponent;

VideoPlayer.List = List;

export { Types };
export default VideoPlayer;
