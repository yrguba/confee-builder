import React, { useEffect } from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { PreJoinView, useCall, callApi, callStore, callTypes } from 'entities/call';
import { useStorage, useRingtone, useEffectOnce, useRouter, useRustServer, useEasyState, useReverseTimer } from 'shared/hooks';

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

    const viewer = viewerStore.use.viewer();
    const enableNotifications = appStore.use.enableNotifications();

    const callData = params.call_data ? JSON.parse(params.call_data) : null;

    const call = useCall();
    const timer = useReverseTimer({ hours: 0, minutes: 0, seconds: 30 });

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

    useUpdateEffect(() => {
        if (timer.time[2] === 0 && !response.value) {
            [viewer.value.id, callData.initiatorId].forEach((id) => {
                handleCallResponse({
                    call_id: callData.callId,
                    chat_id: callData.chatId,
                    room_id: callData.roomId,
                    user_id: id,
                    response: 'timeout',
                });
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
            call.leftCall({ call_id: callData.callId, chat_id: callData.chatId, room_id: callData.roomId } as any);
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

    const joining = (value: boolean) => {
        handleCallResponse({
            call_id: callData.callId,
            chat_id: callData.chatId,
            room_id: callData.roomId,
            user_id: callData.initiatorId,
            response: value ? 'accepted' : 'reject',
        });
        if (!value) {
            call.closeWindow({ call_id: callData.callId, roomId: callData.roomId, chat_id: callData.chatId });
        } else {
            call.goToRoom(callData);
        }
    };

    useUpdateEffect(() => {
        responses.value.forEach((r) => {
            if (callData.callId === r.callId) {
                response.set(r.response);
                if (r.response === 'accepted') {
                    call.goToRoom(callData);
                }
                responses.set(responses.value.filter((i) => i.callId !== callData.callId));
            }
        });
    }, [responses.value]);

    return (
        <>
            {audio}
            <PreJoinView
                createCall={createCall}
                response={response.value}
                joining={joining}
                type={callData?.type}
                name={callData?.name}
                avatar={callData?.avatar?.split('|').join('/')}
            />
        </>
    );
}

export default PreJoin;
