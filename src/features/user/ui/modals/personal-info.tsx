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

    const openPersonalInfoModal = useUserStore.use.openPersonalInfoModal();
    const setOpenPersonalInfoModal = useUserStore.use.setOpenPersonalInfoModal();

    // const close = () => {
    //     setOpenContactsModal(true);
    //     setOpenAddContactsModal(false);
    // };

    useEffect(() => {
        openPersonalInfoModal ? personalInfoModal.open() : personalInfoModal.close();
    }, [openPersonalInfoModal]);

    return (
        <Modal {...personalInfoModal} onClose={() => setOpenPersonalInfoModal(false)}>
            <PersonalInfoModalView user={null} />
        </Modal>
    );
}

export default UserPersonalInfoModal;
