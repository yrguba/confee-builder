import React from 'react';
import { useParams } from 'react-router';

import { meetApi, MeetView, useMeetStore } from 'entities/meet';
import { useEasyState, useRouter, useJitsi, useEffectOnce, useStorage } from 'shared/hooks';

import { appService } from '../../../entities/app';

function Meet() {
    const { clientFullURL } = appService.getUrls();
    const meetId = clientFullURL.split('/').pop();

    const { get: getLocalStorage } = useStorage();
    const { ConferenceWebView } = useJitsi({ meetId });

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();
    console.log('meet', getLocalStorage('active-meeting'));
    useEffectOnce(() => {
        console.log(meetId);
        if (meetId) {
            handleCreateMeeting;
        }
    });

    return meetId ? <ConferenceWebView /> : null;
}

export default Meet;
