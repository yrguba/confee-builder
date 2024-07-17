import React from 'react';
import { useUpdateEffect } from 'react-use';

import { AddContactModalView, contactTypes, contactApi } from 'entities/contact';
import { userApi } from 'entities/user';
import { useEasyState, useYup } from 'shared/hooks';
import { Modal, Input, Notification, ModalTypes } from 'shared/ui';

function AddContactModal(modal: ModalTypes.UseReturnedType) {
    const notification = Notification.use();

    const handleCheckPhone = userApi.handleCheckPhone();
    const { mutate: handleCreateContact } = contactApi.handleCreateContact();
    const phoneState = useEasyState('');

    const yup = useYup();

    const firstName = Input.use({
        yupSchema: yup.required('Введите имя контакта'),
    });

    const lastName = Input.use({});

    const phone = Input.use({
        resetFocusError: false,
        onlyType: 'number',
        yupSchema: yup.checkPhone('Введите номер телефона'),
        callbackPhone: (value) => {
            if (String(value).length === 12) {
                handleCheckPhone({ phone: value }).then((res) => {
                    if (!res.exists) {
                        phone.setError('Номер не найден в Confee');
                    } else {
                        phoneState.set(String(value));
                        phone.setError('');
                    }
                });
            } else {
                phone.setError('');
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
                    last_name: lastName.value,
                    phone: phoneState.value,
                },
                {
                    onSuccess: () => {
                        modal.close();
                        notification.success({ title: `Контакт ${phoneInput.value} добавлен` });
                    },
                }
            );
        }
    };

    return (
        <AddContactModalView
            disabledSendBtn={phone.error || !firstName.value || phone.value.length !== 10}
            back={modal.close}
            addContact={addContact}
            inputs={{ firstName, lastName, phone }}
        />
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <AddContactModal {...modal} />
        </Modal>
    );
}
