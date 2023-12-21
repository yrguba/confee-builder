import React from 'react';
import { useNavigate } from 'react-router-dom';

import { JoinMeetModalView, useMeetStore } from 'entities/meet';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { appService } from '../../../../entities/app';
import { useWebView } from '../../../../shared/hooks';
import { getRandomString } from '../../../../shared/lib';

function JoinMeetModal(modal: ModalTypes.UseReturnedType) {
    const navigate = useNavigate();
    const joinRequest = useMeetStore.use.joinRequest();

    const meetPath = `/meet/${joinRequest.value.id}`;
    console.log(meetPath);
    const webView = useWebView(meetPath, 'meet', 'Конференция', 'active-meeting');

    const joining = (value: boolean) => {
        if (value) {
            if (appService.tauriIsRunning) {
                webView?.open();
            } else {
                navigate(meetPath);
            }
        }
        joinRequest.clear();
    };

    return <JoinMeetModalView joining={joining} {...joinRequest.value} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} closeIcon={false}>
            <JoinMeetModal {...modal} />
        </Modal>
    );
}
