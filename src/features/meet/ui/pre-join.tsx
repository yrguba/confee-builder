import { WebviewWindow } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { PreJoinView, meetApi, meetStore, useMeet, meetTypes } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter, useRustServer, useEasyState, useReverseTimer } from 'shared/hooks';

import { appStore } from '../../../entities/app';
import { Responses } from '../../../entities/meet/model/types';
import { viewerStore } from '../../../entities/viewer';
import { useAudio } from '../../../shared/hooks';

const outCallAudio = require('assets/ringtone/hone_ringing.mp3');
const inCallAudio = require('assets/ringtone/Impress.mp3');

type Props = {};

function PreJoin(props: Props) {
    const { params, navigate } = useRouter();

    const { mutate: handleCallResponse } = meetApi.handleCallResponse();
    const responses = meetStore.use.responses();

    const viewer = viewerStore.use.viewer();
    const enableNotifications = appStore.use.enableNotifications();

    const meetData = params.meet_data ? JSON.parse(params.meet_data) : null;

    const meet = useMeet();
    const timer = useReverseTimer({ hours: 0, minutes: 0, seconds: 10 });

    const [audio, state, controls, ref] = useAudio({
        src: meetData.type === 'in' ? inCallAudio : '',
        autoPlay: !!enableNotifications.value,
    });

    const response = useEasyState<Responses | null>(null);

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
            [viewer.value.id, meetData.initiatorId].forEach((id) => {
                handleCallResponse({
                    call_id: meetData.callId,
                    chat_id: meetData.chatId,
                    room_id: meetData.roomId,
                    user_id: id,
                    response: 'timeout',
                });
            });
            timer.reset();
        }
    }, [timer.time]);

    useEffect(() => {
        setTimeout(() => controls.play(), 1000);
    }, [ref.current]);

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            meet.leftCall({ call_id: meetData.callId, chat_id: meetData.chatId, room_id: meetData.roomId } as any);
        }
    }, []);

    const createCall = () => {
        response.set(null);
        timer.start();
        meet.leftCall({ call_id: meetData.callId, chat_id: meetData.chatId, room_id: meetData.roomId } as any);
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

    useUpdateEffect(() => {
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
            {audio}
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
