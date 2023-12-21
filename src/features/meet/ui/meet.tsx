import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { meetApi, MeetView, useMeetStore } from 'entities/meet';
import { useEasyState, useRouter, useJitsi, useEffectOnce, useLifecycles, useStorage } from 'shared/hooks';

import { appService } from '../../../entities/app';
import { ChatProxy } from '../../../entities/chat/model/types';

function Meet() {
    const { clientFullURL } = appService.getUrls();

    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];
    const { set: setLocalStorage, get: getLocalStorage } = useStorage();
    const { ConferenceWebView } = useJitsi({ meetId });
    console.log(clientFullURL);
    return <div>{meetId}</div>;
}

export default Meet;
