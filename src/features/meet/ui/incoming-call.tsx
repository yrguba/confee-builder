import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useLifecycles } from 'react-use';

import { IncomingCallView, meetApi, meetStore, useMeet } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter } from 'shared/hooks';

import { appStore } from '../../../entities/app';

type Props = {
    meetId?: string;
};

function IncomingCall(props: Props) {
    const { params } = useRouter();

    const enableNotifications = appStore.use.enableNotifications();
    const calls = meetStore.use.calls();

    const { mutate: handleCallResponse } = meetApi.handleCallResponse();

    // const data = ls.get('join_meet_data');
    // const { controls, audio } = useRingtone({ enabled: enableNotifications.value && !incomingCall.value?.muted });

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

    // const { joinMeet } = useMeet();
    // console.log(incomingCall.value);
    const joining = (value: boolean) => {
        if (call) {
            handleCallResponse(call.chatId, call.id, value ? 'accepted' : 'reject', call.userId);
        }
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
            <IncomingCallView joining={joining} {...{}} />
        </>
    );
}

export default IncomingCall;
