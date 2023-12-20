import React from 'react';
import { useParams } from 'react-router';

import { MeetView } from 'entities/meet';
import { useEasyState, useRouter, useJitsi } from 'shared/hooks';

import { appService } from '../../../entities/app';

function Meet() {
    const { clientFullURL } = appService.getUrls();

    const meetId = clientFullURL.split('/').pop() || 'efsfesfesfq';

    const { ConferenceWebView } = useJitsi({ meetId });

    return <ConferenceWebView />;
}

export default Meet;
