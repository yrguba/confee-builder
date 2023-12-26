import React, { useEffect } from 'react';

import { MeetRoomView } from 'entities/meet';

import { appService } from '../../../entities/app';

function MeetRoom() {
    const { clientFullURL } = appService.getUrls();

    const meetStr = clientFullURL.split('/').pop();
    const meetId = meetStr?.split(':')[0];

    return meetId ? <MeetRoomView meetId={meetId} /> : null;
}

export default MeetRoom;
