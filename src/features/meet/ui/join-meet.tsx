import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';

import { JoinMeetView, useMeet, useMeetStore } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce } from 'shared/hooks';

function JoinMeet() {
    const ls = useStorage();
    const data = ls.get('req-to-join-room');

    const { play } = useRingtone();

    useEffectOnce(() => {
        play();
    });

    const meetPath = data?.id ? `/meet/room/${data.id}` : '';

    const { joinMeet } = useMeet();

    const joining = (value: boolean) => {
        if (value && meetPath) {
            joinMeet(meetPath);
        }
        ls.remove('req-to-join-room');
        const joinWindow = WebviewWindow.getByLabel('join_meet');
        joinWindow?.close();
    };

    return <JoinMeetView joining={joining} {...data} />;
}

export default JoinMeet;
