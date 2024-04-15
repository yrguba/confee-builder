import { WebviewWindow } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { PreJoinView, meetApi, meetStore, useMeet, meetTypes } from 'entities/meet';
import { useStorage, useRingtone, useEffectOnce, useRouter, useRustServer, useEasyState } from 'shared/hooks';

import { appStore } from '../../../entities/app';
import { Responses } from '../../../entities/meet/model/types';
import { useAudio } from '../../../shared/hooks';

const outCallAudio = require('assets/ringtone/hone_ringing.mp3');
const inCallAudio = require('assets/ringtone/Impress.mp3');

type Props = {};

function PreJoin(props: Props) {
    const { params, navigate } = useRouter();

    const { mutate: handleCallResponse } = meetApi.handleCallResponse();
    const responses = meetStore.use.responses();

    const enableNotifications = appStore.use.enableNotifications();

    const meetData = params.meet_data ? JSON.parse(params.meet_data) : null;

    const meet = useMeet();

    const [audio, state, controls, ref] = useAudio({
        src: meetData.type === 'in' ? inCallAudio : '',
        autoPlay: !!enableNotifications.value,
    });

    const response = useEasyState<Responses | null>(null);

    // console.log(meetData);

    useLifecycles(
        () => {},
        () => {
            // alert('wdadw');
        }
    );

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            handleCallResponse({
                call_id: meetData.callId,
                chat_id: meetData.chatId,
                room_id: meetData.roomId,
                user_id: meetData.initiatorId,
                response: 'reject',
            });
        }
    }, []);

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
