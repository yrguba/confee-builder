import React from 'react';

import { PersonalInfoModalView, userTypes } from 'entities/user';
import { Modal } from 'shared/ui';

function UserPersonalInfoModal() {
    const personalInfoModal = Modal.use<userTypes.ModalName, { id: number }>('personal-info');
    console.log(personalInfoModal.payload);
    return (
        <Modal {...personalInfoModal}>
            <PersonalInfoModalView getChangeModals={() => ''} getScreenshot={() => ''} deleteFile={() => () => ''} selectFile={() => ''} user={null} />
        </Modal>
    );
}

export default UserPersonalInfoModal;
