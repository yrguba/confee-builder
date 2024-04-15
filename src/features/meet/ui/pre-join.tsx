import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { PreJoinView, meetApi, meetStore, useMeet } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter, useRustServer } from 'shared/hooks';

import { appStore } from '../../../entities/app';

type Props = {};

function PreJoin(props: Props) {
    const { params, navigate } = useRouter();

    const enableNotifications = appStore.use.enableNotifications();

    const meetDataParse = params.meet_data ? JSON.parse(params.meet_data) : null;

    const { useWebview, rustIsRunning, socket } = useRustServer();
    const meet = useMeet();

    // const { data: meetData } = meetApi.handleGetMeet(meetDataParse);
    // console.log(meetData);
    // const { mutate: handleCallResponse } = meetApi.handleCallResponse();

    // useUpdateEffect(() => {
    //     if (params?.meet_id) {
    //         socket.listen(`meet-${params.meet_id}`, 'meetData', (data) => {
    //             console.log(data);
    //         });
    //     }
    // }, [params?.meet_id]);

    useLifecycles(
        () => {},
        () => {
            // controls.pause();
        }
    );

    const joining = (value: boolean) => {
        // if (params.meet_id) {
        //     value ? navigate(`/meet/room/${params.meet_id}`) : meet.closeCall(params.meet_id);
        // }
    };

    return (
        <>
            {/* {audio} */}
            <PreJoinView joining={joining} {...{}} />
        </>
    );
}

export default PreJoin;
