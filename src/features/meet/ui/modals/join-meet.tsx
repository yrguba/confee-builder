import React from 'react';

import { JoinMeetModalView, useMeet, useMeetStore } from 'entities/meet';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { appService } from '../../../../entities/app';
import { useRouter, useStorage, useWebView } from '../../../../shared/hooks';

function JoinMeetModal(modal: ModalTypes.UseReturnedType) {
    const joinRequest = useMeetStore.use.joinRequest();

    const meetPath = joinRequest.value.id ? `/meet/${joinRequest.value.id}` : '';

    const { joinMeet } = useMeet();

    const joining = (value: boolean) => {
        if (value) {
            joinMeet(meetPath);
        }
        modal.close();
        setTimeout(() => joinRequest.clear(), 500);
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
