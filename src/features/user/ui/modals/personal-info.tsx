import React from 'react';

import { PersonalInfoModalView, userTypes } from 'entities/user';
import { Modal } from 'shared/ui';

function UserPersonalInfoModal() {
    const personalInfoModal = Modal.use<userTypes.Modals>('personalInfo');

    return (
        <Modal {...personalInfoModal}>
            <PersonalInfoModalView
                getChangeModals={() => ''}
                getScreenshot={() => ''}
                deleteFile={() => () => ''}
                selectFile={() => ''}
                user={personalInfoModal.payload}
            />
        </Modal>
    );
}

export default UserPersonalInfoModal;
