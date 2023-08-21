import React from 'react';

import { UserProfileModalView } from 'entities/user';
import { Modal } from 'shared/ui';

function UserProfileModal() {
    const personalInfoModal = Modal.use();

    return (
        <Modal {...personalInfoModal}>
            <UserProfileModalView getChangeModals={() => ''} getScreenshot={() => ''} deleteFile={() => () => ''} selectFile={() => ''} user={null} />
        </Modal>
    );
}

export default UserProfileModal;
