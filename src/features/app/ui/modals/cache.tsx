import React from 'react';

import { CacheView } from 'entities/app';
import { Modal, ModalTypes } from 'shared/ui';

function CacheModal(modal: ModalTypes.UseReturnedType) {
    return <CacheView />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <CacheModal {...modal} />
        </Modal>
    );
}
