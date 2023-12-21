import React from 'react';

import { JoinMeetModalView } from 'entities/meet';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

function JoinMeetModal(modal: ModalTypes.UseReturnedType) {
    return <JoinMeetModalView />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <JoinMeetModal {...modal} />
        </Modal>
    );
}
