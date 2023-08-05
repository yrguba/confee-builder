import React from 'react';

import { GroupAudioCallView } from 'entities/calls';
import { useEasyState } from 'shared/hooks';

function GroupAudioCall() {
    const callStartedState = useEasyState(false);
    const microphoneState = useEasyState(false);

    return <GroupAudioCallView callStartedState={callStartedState} microphoneState={microphoneState} />;
}

export default GroupAudioCall;
