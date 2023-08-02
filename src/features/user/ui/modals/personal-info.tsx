import React, { useEffect } from 'react';

import { PersonalInfoModalView, useUserStore } from 'entities/user';
import { useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

type Props = {
    direction?: 'column' | 'row';
};

function UserPersonalInfoModal(props: Props) {
    const { direction } = props;

    const personalInfoModal = useModal();

    const openUserModal = useUserStore.use.openModal();
    const setOpenUserModal = useUserStore.use.setOpenModal();

    useEffect(() => {
        openUserModal === 'personal-info' ? personalInfoModal.open() : personalInfoModal.close();
    }, [openUserModal]);

    return (
        <Modal {...personalInfoModal} onClose={() => setOpenUserModal(null)}>
            <PersonalInfoModalView getChangeModals={() => ''} getScreenshot={() => ''} deleteFile={() => () => ''} selectFile={() => ''} user={null} />
        </Modal>
    );
}

export default UserPersonalInfoModal;
