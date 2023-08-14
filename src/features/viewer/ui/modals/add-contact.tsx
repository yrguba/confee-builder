import React, { useEffect } from 'react';

import { AddContactModalView, viewerTypes } from 'entities/viewer';
import { useYup } from 'shared/hooks';
import { Modal, Input } from 'shared/ui';

function AddContactModal() {
    const yup = useYup();

    const firstName = Input.use({
        yupSchema: yup.required,
    });

    const lastName = Input.use({});

    const phone = Input.use({
        yupSchema: yup.checkPhone,
        callbackPhone: (value) => {
            console.log(value);
        },
    });

    const addContactModal = Modal.use<viewerTypes.ModalName>('add-contact', { showPrevModalAfterClose: true });

    const addContact = async () => {
        const phoneRes = await phone.asyncValidate();
        console.log(phoneRes);
    };

    return (
        <>
            <Modal {...addContactModal} onClose={addContactModal.close}>
                <AddContactModalView back={addContactModal.close} addContact={addContact} inputs={{ firstName, lastName, phone }} />
            </Modal>
        </>
    );
}

export default AddContactModal;
