import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useLifecycles } from 'react-use';

import { OutgoingCallView, meetStore, useMeet } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter } from 'shared/hooks';

import { appStore } from '../../../entities/app';

type Props = {
    meetId?: string;
};

function OutGoingCall(props: Props) {
    const { params } = useRouter();
    const enableNotifications = appStore.use.enableNotifications();
    const calls = meetStore.use.calls();
    // const data = ls.get('join_meet_data');
    // const { controls, audio } = useRingtone({ enabled: enableNotifications.value && !incomingCall.value?.muted });

    const meetId = props?.meetId || params.meet_id;
    const call = calls.value.find((i) => i.id === meetId);

    useEffectOnce(() => {});

    useLifecycles(
        () => {},
        () => {
            // controls.pause();
        }
    );

    useEffectOnce(() => {
        // if()
    });

    // const { joinMeet } = useMeet();
    // console.log(incomingCall.value);
    const joining = (value: boolean) => {
        // const joinWindow = WebviewWindow.getByLabel('meet');
        //
        // if (value && data && data) {
        //     joinMeet(data.id);
        // } else {
        //     joinWindow?.close();
        // }
        // ls.remove('join_meet_data');
    };

    return (
        <>
            {/* {audio} */}
            <OutgoingCallView joining={joining} {...{}} />
        </>
    );
}

export default OutGoingCall;
