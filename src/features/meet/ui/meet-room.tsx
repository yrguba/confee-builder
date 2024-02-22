import React from 'react';

import { MeetRoomView } from 'entities/meet';

import { appService } from '../../../entities/app';
import { viewerApi, viewerProxy } from '../../../entities/viewer';
import { useStorage } from '../../../shared/hooks';
import { Modal } from '../../../shared/ui';
import { InviteToMeetModal } from '../index';

function MeetRoom() {
    const { clientFullURL } = appService.getUrls();
    const ls = useStorage();
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const viewer = viewerProxy(viewerData?.user);

    const inviteToMeetModal = Modal.use();

    const chatId = ls.get('meet_chat_id');
    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];

    return meetId ? (
        <>
            <InviteToMeetModal {...inviteToMeetModal} />
            <MeetRoomView viewer={viewer} meetId={meetId} invite={inviteToMeetModal.open} chatId={chatId} />
        </>
    ) : null;
}

export default MeetRoom;
