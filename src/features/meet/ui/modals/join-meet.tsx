import React from 'react';
import { useNavigate } from 'react-router-dom';

import { JoinMeetModalView, useMeetStore } from 'entities/meet';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { appService } from '../../../../entities/app';
import { useRouter, useStorage, useWebView } from '../../../../shared/hooks';
import { getRandomString } from '../../../../shared/lib';

function JoinMeetModal(modal: ModalTypes.UseReturnedType) {
    const joinRequest = useMeetStore.use.joinRequest();
    const notification = Notification.use();
    const { params, navigate } = useRouter();
    const meetPath = joinRequest.value.id ? `/meet/${joinRequest.value.id}` : '';

    const { set: setLocalStorage, get: getLocalStorage } = useStorage();

    const webView = useWebView(meetPath, 'meet', 'Конференция', 'active-meeting');

    const joining = (value: boolean) => {
        if (value) {
            if (getLocalStorage('active-meeting') || params.meet_id) {
                return notification.info({ title: 'Сначала покиньте текущую конференцию', system: true });
            }
            if (appService.tauriIsRunning) {
                webView?.open();
                setLocalStorage('active-meeting', true);
            } else {
                navigate(meetPath);
            }
        }
        setTimeout(() => joinRequest.clear(), 1000);
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
