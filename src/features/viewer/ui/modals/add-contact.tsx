import React from 'react';

import { userApi } from 'entities/user';
import { AddContactModalView, viewerTypes, viewerApi } from 'entities/viewer';
import { useEasyState, useYup } from 'shared/hooks';
import { Modal, Input, Notification } from 'shared/ui';

function AddContactModal() {
    const addContactModal = Modal.use<viewerTypes.ModalName>('add-contact');
    const contacts = Modal.use<viewerTypes.ModalName>('contacts');

    const notification = Notification.use();

    const handleCheckPhone = userApi.handleCheckPhone();
    const { mutate: handleCreateContact } = viewerApi.handleCreateContact();
    const phoneState = useEasyState('');

    const yup = useYup();

    const firstName = Input.use({
        yupSchema: yup.required,
    });

    const lastName = Input.use({});

    const phone = Input.use({
        yupSchema: yup.checkPhone,
        callbackPhone: (value) => {
            if (String(value).length === 6) {
                phone.setError('');
            }
            if (String(value).length === 12) {
                handleCheckPhone({ phone: value }).then((res) => {
                    if (!res.exists) {
                        phone.setError('Номер не найден в Confee');
                    } else {
                        phoneState.set(String(value));
                        phone.setError('');
                    }
                });
            }
        },
    });

    const addContact = async () => {
        const phoneInput = await phone.asyncValidate();
        const firstNameInput = await firstName.asyncValidate();
        if (!phoneInput.error && !firstNameInput.error) {
            handleCreateContact(
                {
                    first_name: firstNameInput.value,
                    phone: phoneState.value,
                },
                {
                    onSuccess: () => {
                        addContactModal.close();
                        notification.success({ title: `Контакт ${phoneInput.value} добавлен` });
                    },
                }
            );
        }
    };

    const onClose = () => {
        contacts.open();
        firstName.reload();
        lastName.reload();
        phone.reload();
    };

    return (
        <>
            <Modal {...addContactModal} onClose={onClose}>
                <AddContactModalView back={addContactModal.close} addContact={addContact} inputs={{ firstName, lastName, phone }} />
            </Modal>
        </>
    );
}

export default AddContactModal;
