import React from 'react';

import { PersonalInfoModalView, userTypes } from 'entities/user';
import { Modal } from 'shared/ui';

function UserPersonalInfoModal() {
    const personalInfoModal = Modal.use<userTypes.ModalName>('personal-info');

    return (
        <Modal {...personalInfoModal}>
            <PersonalInfoModalView getChangeModals={() => ''} getScreenshot={() => ''} deleteFile={() => () => ''} selectFile={() => ''} user={null} />
        </Modal>
    );
}

export default UserPersonalInfoModal;
