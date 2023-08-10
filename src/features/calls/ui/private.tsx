import React from 'react';

import { PrivateCallView } from 'entities/calls';
import { useEasyState, useRouter } from 'shared/hooks';

function PrivateCall() {
    const { params } = useRouter();

    return <PrivateCallView />;
}

export default PrivateCall;
