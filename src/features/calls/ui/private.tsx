import React from 'react';

import { PrivateCallView } from 'entities/calls';
import { useEasyState, useRouter, useJitsi } from 'shared/hooks';

function PrivateCall() {
    const { ConferenceWebView } = useJitsi();
    console.log('start confa');
    return <ConferenceWebView />;
}

export default PrivateCall;
