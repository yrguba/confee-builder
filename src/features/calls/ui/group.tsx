import React from 'react';

import { GroupCallView } from 'entities/calls';
import { useEasyState } from 'shared/hooks';

function GroupCall() {
    const callStartedState = useEasyState(false);
    const microphoneState = useEasyState(false);

    return <GroupCallView callStartedState={callStartedState} microphoneState={microphoneState} />;
}

export default GroupCall;
