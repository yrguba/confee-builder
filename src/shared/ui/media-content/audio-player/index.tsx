import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Card from './ui/card';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseAudioPlayerProps> & {
    List: typeof List;
    Card: typeof Card;
};

const AudioPlayer = Base as CompoundedComponent;

AudioPlayer.List = List;
AudioPlayer.Card = Card;

export { Types };
export default AudioPlayer;
