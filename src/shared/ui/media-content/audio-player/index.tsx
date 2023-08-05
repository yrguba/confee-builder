import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import VoiceAudioPlayer from './ui/voice';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseAudioPlayerProps> & {
    Voice: typeof VoiceAudioPlayer;
};

const AudioPlayer = Base as CompoundedComponent;

AudioPlayer.Voice = VoiceAudioPlayer;

export { Types };
export default AudioPlayer;
