import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { PreJoinView, meetApi, meetStore, useMeet, meetTypes } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter, useRustServer, useEasyState } from 'shared/hooks';

import { appStore } from '../../../entities/app';
import { Responses } from '../../../entities/meet/model/types';

type Props = {};

function PreJoin(props: Props) {
    const { params, navigate } = useRouter();

    const { mutate: handleCallResponse } = meetApi.handleCallResponse();
    const responses = meetStore.use.responses();

    const enableNotifications = appStore.use.enableNotifications();

    const meetData = params.meet_data ? JSON.parse(params.meet_data) : null;

    const { useWebview, rustIsRunning, socket } = useRustServer();
    const meet = useMeet();

    const response = useEasyState<Responses | null>(null);

    // console.log(meetData);

    useLifecycles(
        () => {},
        () => {
            // controls.pause();
        }
    );

    const createCall = () => {
        meet.outgoingPrivateCall(meetData);
        responses.clear();
        response.set(null);
    };

    const joining = (value: boolean) => {
        handleCallResponse({
            call_id: meetData.callId,
            chat_id: meetData.chatId,
            room_id: meetData.roomId,
            user_id: meetData.initiatorId,
            response: value ? 'accepted' : 'reject',
        });
        if (!value) {
            meet.closeWindow({ call_id: meetData.callId, roomId: meetData.roomId, chat_id: meetData.chatId });
        } else {
            meet.goToRoom(meetData);
        }
    };
    console.log(meetData);
    useUpdateEffect(() => {
        console.log(responses.value);
        responses.value.forEach((r) => {
            if (meetData.callId === r.callId) {
                response.set(r.response);
                if (r.response === 'accepted') {
                    meet.goToRoom(meetData);
                }
                responses.set(responses.value.filter((i) => i.callId !== meetData.callId));
            }
        });
    }, [responses.value]);

    return (
        <>
            {/* {audio} */}
            <PreJoinView
                createCall={createCall}
                response={response.value}
                joining={joining}
                type={meetData?.type}
                name={meetData?.name}
                avatar={meetData?.avatar?.split('|').join('/')}
            />
        </>
    );
}

export default PreJoin;
