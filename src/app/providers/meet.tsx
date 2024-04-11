import React, { JSX, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { meetStore, useMeet } from '../../entities/meet';

function MeetProvider({ children }: { children: JSX.Element }) {
    const calls = meetStore.use.calls();

    const { showIncomingCall } = useMeet();

    useUpdateEffect(() => {
        if (calls.value.length) {
            console.log(calls);
            calls.value.forEach((call) => {
                if (call.status === 'incoming') {
                    console.log(call);
                    showIncomingCall(call.id);
                }
            });
        }
    }, [calls.value]);

    return children;
}

export default MeetProvider;
