import React, { useEffect } from 'react';

import { CallRoomView, useCall } from 'entities/call';

import { appService } from '../../../entities/app';
import { viewerApi, viewerProxy } from '../../../entities/viewer';
import { useRouter, useStorage } from '../../../shared/hooks';
import { Modal } from '../../../shared/ui';
import { InviteToMeetModal } from '../index';

function CallRoom() {
    const { clientFullURL } = appService.getUrls();

    const { params } = useRouter();

    const ls = useStorage();
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const viewer = viewerProxy(viewerData?.user);

    const inviteToMeetModal = Modal.use();
    const callData = params.call_data ? JSON.parse(params.call_data) : null;

    const call = useCall();

    const meetData = params.call_data ? JSON.parse(params.call_data) : null;
    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];

    useEffect(() => {
        call.closeListener(callData);
    }, [callData]);

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            call.closeWindow();
        }
    }, []);

    const close = () => {
        call.closeWindow();
    };

    return meetId ? (
        <>
            <InviteToMeetModal {...inviteToMeetModal} />
            <CallRoomView close={close} viewer={viewer} meetId={meetData.roomId} invite={inviteToMeetModal.open} chatId={3} />
        </>
    ) : null;
}

export default CallRoom;
