import React from 'react';

import { appService, NetworkView } from 'entities/app';

function Network() {
    const networkState = appService.getNetworkState();

    return <NetworkView networkState={networkState} />;
}

export default Network;
