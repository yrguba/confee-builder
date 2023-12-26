import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';

import { JoinMeetView, useMeet, useMeetStore } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce } from 'shared/hooks';

function JoinMeet() {
    const ls = useStorage();

    const { play } = useRingtone();

    const invitationsToConference = useMeetStore.use.invitationsToConference();

    useEffectOnce(() => {
        play();
    });

    const { joinMeet } = useMeet();

    const joining = (value: boolean) => {
        const joinWindow = WebviewWindow.getByLabel('meet');
        const data = ls.get('join_meet_data');
        if (value && data && data) {
            joinMeet(data.id);
        } else {
            joinWindow?.close();
        }
    };

    return <JoinMeetView joining={joining} />;
}

export default JoinMeet;
