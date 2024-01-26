import React from 'react';
import { useNetworkState } from 'react-use';

import { NetworkView } from 'entities/app';

function Network() {
    const a = useNetworkState();
    console.log(a);
    return <NetworkView />;
}

export default Network;
