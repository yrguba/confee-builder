import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import Card from './ui/card';
import List from './ui/list';
import Voice from './ui/voice';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseAudioProps> & {
    List: typeof List;
    Card: typeof Card;
    Voice: typeof Voice;
};

const Audio = Base as CompoundedComponent;

Audio.List = List;
Audio.Card = Card;
Audio.Voice = Voice;

export { Types };
export default Audio;
