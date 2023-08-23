import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseAudioPlayerProps> & {
    List: typeof List;
};

const AudioPlayer = Base as CompoundedComponent;

AudioPlayer.List = List;

export { Types };
export default AudioPlayer;
