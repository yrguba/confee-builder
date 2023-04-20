import React, { ForwardRefExoticComponent } from 'react';

import * as AudioPlayerTypes from './types';
import BaseAudioPlayer from './ui/base';
import VoiceAudioPlayer from './ui/voice';

type CompoundedComponent = ForwardRefExoticComponent<AudioPlayerTypes.BaseAudioPlayerProps> & {
    Voice: typeof VoiceAudioPlayer;
};

const AudioPlayer = BaseAudioPlayer as CompoundedComponent;

AudioPlayer.Voice = VoiceAudioPlayer;

export { AudioPlayerTypes };
export default AudioPlayer;
