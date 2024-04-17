import React from 'react';

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

    const meet = useCall();

    const meetData = params.call_data ? JSON.parse(params.call_data) : null;
    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];

    const close = () => {
        meet.closeWindow({ call_id: meetData.callId, roomId: meetData.roomId, chat_id: meetData.chatId });
    };

    return meetId ? (
        <>
            <InviteToMeetModal {...inviteToMeetModal} />
            <CallRoomView close={close} viewer={viewer} meetId={meetData.roomId} invite={inviteToMeetModal.open} chatId={3} />
        </>
    ) : null;
}

export default CallRoom;
