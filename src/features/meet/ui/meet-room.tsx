import React from 'react';

import { MeetRoomView, useMeet } from 'entities/meet';

import { appService } from '../../../entities/app';
import { viewerApi, viewerProxy } from '../../../entities/viewer';
import { useRouter, useStorage } from '../../../shared/hooks';
import { Modal } from '../../../shared/ui';
import { InviteToMeetModal } from '../index';

function MeetRoom() {
    const { clientFullURL } = appService.getUrls();

    const { params } = useRouter();

    const ls = useStorage();
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const viewer = viewerProxy(viewerData?.user);

    const inviteToMeetModal = Modal.use();

    const meet = useMeet();

    const meetData = params.meet_data ? JSON.parse(params.meet_data) : null;
    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];

    const close = () => {
        meet.closeWindow({ call_id: meetData.callId, roomId: meetData.roomId, chat_id: meetData.chatId });
    };

    return meetId ? (
        <>
            <InviteToMeetModal {...inviteToMeetModal} />
            <MeetRoomView close={close} viewer={viewer} meetId={meetData.roomId} invite={inviteToMeetModal.open} chatId={3} />
        </>
    ) : null;
}

export default MeetRoom;
