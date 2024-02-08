import React, { ForwardRefExoticComponent } from 'react';

import useAudioStore from './store';
import * as Types from './types';
import Base from './ui/base';
import Player from './ui/player';
import Voice from './ui/voice';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseAudioProps> & {
    Voice: typeof Voice;
    Player: typeof Player;
    store: typeof useAudioStore;
};

const Audio = Base as CompoundedComponent;

Audio.Voice = Voice;
Audio.Player = Player;
Audio.store = useAudioStore;

export { Types };

export default Audio;
