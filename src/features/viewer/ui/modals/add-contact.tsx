import React, { useEffect } from 'react';

import { yup } from 'entities/app';
import { useUserStore } from 'entities/user';
import { AddContactModalView } from 'entities/viewer';
import { useInput, useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

function AddContactModal() {
    const firstNameInput = useInput({
        yupSchema: yup.required,
    });

    const openUserModal = useUserStore.use.openModal();
    const setOpenUserModal = useUserStore.use.setOpenModal();

    const addContactModal = useModal();

    useEffect(() => {
        openUserModal === 'add-contact' ? addContactModal.open() : addContactModal.close();
    }, [openUserModal]);

    const close = () => {
        setOpenUserModal('contacts');
    };

    const addContact = async () => {
        const { error: emailError, value: email } = await firstNameInput.asyncValidate();
    };
    return (
        <>
            <Modal {...addContactModal} onClose={close}>
                <AddContactModalView back={close} addContact={addContact} inputs={{ firstName: firstNameInput }} />
            </Modal>
        </>
    );
}

export default AddContactModal;
