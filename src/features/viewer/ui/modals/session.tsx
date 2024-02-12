import React from 'react';

import { SessionsModalView, viewerApi } from 'entities/viewer';
import { Modal, ModalTypes, CardTypes } from 'shared/ui';

function SessionModal(modal: ModalTypes.UseReturnedType) {
    const { data: sessions } = viewerApi.handleGetAllSessions();

    return <SessionsModalView sessions={sessions} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <SessionModal {...modal} />
        </Modal>
    );
}
