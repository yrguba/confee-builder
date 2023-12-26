import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';

import { JoinMeetView, useMeet, useMeetStore } from 'entities/meet';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { appService } from '../../../entities/app';
import { useRouter, useStorage, useWebView } from '../../../shared/hooks';

function JoinMeet() {
    const ls = useStorage();
    const data = ls.get('req-to-join-room');

    const meetPath = data?.id ? `/meet/room/${data.id}` : '';

    const { joinMeet } = useMeet();

    const joining = (value: boolean) => {
        if (value) {
            joinMeet(meetPath);
        }
        const joinWindow = WebviewWindow.getByLabel('join_meet');
        joinWindow?.close();
        ls.remove('req-to-join-room');
    };

    return <JoinMeetView joining={joining} {...data} />;
}

export default JoinMeet;
