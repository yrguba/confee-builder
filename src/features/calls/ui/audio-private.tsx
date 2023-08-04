import React from 'react';

import { PrivateAudioCallView } from 'entities/calls';
import { useEasyState, useRouter } from 'shared/hooks';

function PrivateAudioCall() {
    const { params } = useRouter();

    return <PrivateAudioCallView />;
}

export default PrivateAudioCall;
