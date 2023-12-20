import React from 'react';

import { M } from 'entities/meet';
import { useEasyState, useRouter, useJitsi } from 'shared/hooks';

function Meet() {
    const { ConferenceWebView } = useJitsi();
    console.log('start confa');
    return <ConferenceWebView />;
}

export default Meet;
