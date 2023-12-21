import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { meetApi, MeetView, useMeetStore } from 'entities/meet';
import { useEasyState, useRouter, useJitsi, useEffectOnce, useStorage } from 'shared/hooks';

import { appService } from '../../../entities/app';
import { ChatProxy } from '../../../entities/chat/model/types';

function Meet() {
    const { clientFullURL } = appService.getUrls();
    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];
    const userId = meetStr?.split(':')[1];
    const chatId = meetStr?.split(':')[2];

    const { ConferenceWebView } = useJitsi({ meetId });

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    useEffectOnce(() => {
        if (meetId && userId) {
            handleCreateMeeting({ chatId, confee_video_room: meetId, target_user_id: Number(userId) });
        }
    });

    return meetId ? <ConferenceWebView /> : null;
}

export default Meet;
