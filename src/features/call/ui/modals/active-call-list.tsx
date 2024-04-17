import React from 'react';

import { ActiveCallListModalView, callTypes } from 'entities/call';
import { Modal, ModalTypes } from 'shared/ui';

import { ChatProxy } from '../../../../entities/chat/model/types';

function ActiveCallListModal(modal: ModalTypes.UseReturnedType<ChatProxy>) {
    return <ActiveCallListModalView chat={modal.payload} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <ActiveCallListModal {...modal} />
        </Modal>
    );
}
