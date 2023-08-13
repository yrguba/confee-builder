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
    const codeCountry = Input.use({
        yupSchema: yup.required,
    });
    const phone = Input.use({
        yupSchema: yup.checkPhone,
        callback: (value) => {
            console.log(value);
        },
    });

    const addContactModal = Modal.use<viewerTypes.ModalName>('add-contact', { showPrevModalAfterClose: true });

    const close = () => {
        addContactModal.close();
    };

    const addContact = async () => {
        const phoneRes = await phone.asyncValidate();
        console.log(phoneRes);
    };
    return (
        <>
            <Modal {...addContactModal} onClose={close}>
                <AddContactModalView back={close} addContact={addContact} inputs={{ firstName, lastName, codeCountry, phone }} />
            </Modal>
        </>
    );
}

export default AddContactModal;
