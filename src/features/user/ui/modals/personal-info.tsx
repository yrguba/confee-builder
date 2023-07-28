import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { PersonalInfoModalView, useUserStore } from 'entities/user';
import { useInput, useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

import { yup } from '../../../../entities/viewer';

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
            <PersonalInfoModalView getScreenshot={() => ''} deleteFile={() => () => ''} selectFile={() => ''} user={null} />
        </Modal>
    );
}

export default UserPersonalInfoModal;
