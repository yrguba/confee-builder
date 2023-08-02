import React, { useEffect } from 'react';

import { yup } from 'entities/app';
import { AddContactModalView, viewerTypes } from 'entities/viewer';
import { Modal, Input } from 'shared/ui';

function AddContactModal() {
    const firstNameInput = Input.use({
        yupSchema: yup.required,
    });

    const addContactModal = Modal.use<viewerTypes.ModalName>('add-contact');

    const close = () => {
        addContactModal.close();
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
