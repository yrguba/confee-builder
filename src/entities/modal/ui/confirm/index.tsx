import React from 'react';

import { Button } from '../../../../shared/ui';
import { Modal, useModal } from '../../index';

function ConfirmModal(props: any) {
    const confirmModal = useModal('confirm');

    return (
        <div>
            <Modal {...confirmModal} />
            <Button onClick={confirmModal.toggle}>open</Button>
        </div>
    );
}

export default ConfirmModal;
