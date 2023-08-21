import React from 'react';

import { UserProfileModalView } from 'entities/user';
import { Modal, ModalTypes } from 'shared/ui';

function UserProfileModal(userProfileModal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...userProfileModal}>
            <UserProfileModalView getChangeModals={() => ''} getScreenshot={() => ''} deleteFile={() => () => ''} selectFile={() => ''} user={null} />
        </Modal>
    );
}

export default UserProfileModal;
