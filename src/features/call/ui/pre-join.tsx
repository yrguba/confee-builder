import React, { useEffect } from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { PreJoinView, useCall, callApi, callStore, callTypes } from 'entities/call';
import { useStorage, useRingtone, useEffectOnce, useRouter, useRustServer, useEasyState, useReverseTimer, useWebSocket } from 'shared/hooks';

import { appStore } from '../../../entities/app';
import { viewerStore } from '../../../entities/viewer';
import { useAudio } from '../../../shared/hooks';

const outCallAudio = require('assets/ringtone/hone_ringing.mp3');
const inCallAudio = require('assets/ringtone/Impress.mp3');

type Props = {};

function PreJoin(props: Props) {
    const { params, navigate } = useRouter();

    const { mutate: handleCallResponse } = callApi.handleCallResponse();
    const responses = callStore.use.responses();
    const socketReady = callStore.use.socketReady();

    const viewer = viewerStore.use.viewer();
    const enableNotifications = appStore.use.enableNotifications();

    const callData = params.call_data ? JSON.parse(params.call_data) : null;

    const call = useCall();
    const timer = useReverseTimer({ hours: 0, minutes: 0, seconds: 10 });

    const [audio, state, controls, ref] = useAudio({
        src: callData.type === 'in' ? inCallAudio : '',
        autoPlay: !!enableNotifications.value,
    });

    const response = useEasyState<callTypes.Responses | null>(null);

    // console.log(meetData);

    useLifecycles(
        () => {
            timer.start();
        },
        () => {
            // alert('wdadw');
        }
    );

    useEffect(() => {
        if (timer.time[2] === 0 && !response.value) {
            handleCallResponse({
                call_id: callData.callId,
                chat_id: callData.chatId,
                room_id: callData.roomId,
                to_user_id: callData.initiatorId,
                from_user_id: viewer.value.id,
                response: 'timeout',
            });

            timer.reset();
        }
    }, [timer.time]);

    useEffect(() => {
        controls.play();
    }, [ref.current]);

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            call.closeWindow();
        }
    }, []);

    useEffect(() => {
        call.closeListener(callData);
    }, [callData]);

    const createCall = () => {
        response.set(null);
        timer.start();
        call.leftCall({ call_id: callData.callId, chat_id: callData.chatId, room_id: callData.roomId } as any);
        call.outgoingPrivateCall(callData);
        responses.clear();
        response.set(null);
    };

    const joiningState = useEasyState<'accepted' | 'reject' | ''>('');

    const joining = (value: boolean) => {
        joiningState.set(value ? 'accepted' : 'reject');
    };

    useEffect(() => {
        if (joiningState.value && socketReady.value) {
            handleCallResponse({
                call_id: callData.callId,
                chat_id: callData.chatId,
                room_id: callData.roomId,
                to_user_id: callData.initiatorId,
                from_user_id: viewer.value.id,
                response: joiningState.value,
            });

            if (joiningState.value === 'reject') {
                call.closeWindow();
            } else {
                call.goToRoom(callData);
            }
        }
    }, [joiningState.value, socketReady.value]);

    useEffect(() => {
        responses.value.forEach((r) => {
            if (callData.callId === r.callId) {
                response.set(r.response);
                if (r.response === 'accepted') {
                    call.goToRoom(callData);
                }
                responses.set(responses.value.filter((i) => i.callId !== callData.callId));
            }
        });
    }, [responses.value.length]);

    return (
        <>
            {audio}
            <PreJoinView
                close={call.closeWindow}
                createCall={createCall}
                response={response.value}
                joining={joining}
                type={callData?.type}
                name={callData?.name}
                avatar={callData?.avatar?.split('|').join('/')}
                loading={!!joiningState.value && !socketReady.value}
            />
        </>
    );
}

export default PreJoin;
