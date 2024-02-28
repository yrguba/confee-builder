import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useLifecycles } from 'react-use';

import { JoinMeetView, useMeet, useMeetStore } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce } from 'shared/hooks';

function JoinMeet() {
    const ls = useStorage();

    const data = ls.get('join_meet_data');
    const { controls, audio } = useRingtone({ enabled: !!ls.get('notification') && !data?.muted });

    useEffectOnce(() => {});

    useLifecycles(
        () => {},
        () => {
            controls.pause();
        }
    );

    const { joinMeet } = useMeet();

    const joining = (value: boolean) => {
        const joinWindow = WebviewWindow.getByLabel('meet');

        if (value && data && data) {
            joinMeet(data.id);
        } else {
            joinWindow?.close();
        }
        ls.remove('join_meet_data');
    };

    return (
        <>
            {audio}
            <JoinMeetView joining={joining} {...data} />
        </>
    );
}

export default JoinMeet;
