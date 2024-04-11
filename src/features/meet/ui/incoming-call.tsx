import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useLifecycles } from 'react-use';

import { IncomingCallView, meetApi, meetStore, useMeet } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter } from 'shared/hooks';

import { appStore } from '../../../entities/app';

type Props = {};

function IncomingCall(props: Props) {
    const { params } = useRouter();

    const enableNotifications = appStore.use.enableNotifications();
    const calls = meetStore.use.incomingCalls();
    const meet = useMeet();

    const { mutate: handleCallResponse } = meetApi.handleCallResponse();

    // const data = ls.get('join_meet_data');
    // const { controls, audio } = useRingtone({ enabled: enableNotifications.value && !incomingCall.value?.muted });

    // const data = ls.get('join_meet_data');
    // const { controls, audio } = useRingtone({ enabled: enableNotifications.value && !incomingCall.value?.muted });
    //
    // const meetId = props?.meetId || params.meet_id;
    // const call = calls.value.find((i) => i.id === meetId);

    const meetJson = JSON.parse(params.meet_data || '');
    const meetData = { ...meetJson, avatar: meetJson.avatar.split('|').join('/') };

    console.log(meetData);
    useEffectOnce(() => {});

    useLifecycles(
        () => {},
        () => {
            // controls.pause();
        }
    );

    // console.log(incomingCall.value);
    const joining = (value: boolean) => {
        window?.top?.postMessage(
            JSON.stringify({
                error: false,
                message: 'Here we go',
            }),
            '*'
        );
        // if (call && meetId) {
        // handleCallResponse(call.chatId, call.id, value ? 'accepted' : 'reject', call.userId);
        // if (value) {
        // } else {
        //     console.log(meetId);
        //     // calls.set(calls.value.filter((i) => i.id !== meetId));
        //     props.reject && props.reject();
        //     meet.closeCall(meetId);
        // }
        // }
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
            <IncomingCallView joining={joining} {...meetData} />
        </>
    );
}

export default IncomingCall;
