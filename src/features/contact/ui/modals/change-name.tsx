import React from 'react';
import { useUpdateEffect } from 'react-use';

import { AddContactModalView, contactTypes, contactApi, ChaneNameContactModalView, contactProxy } from 'entities/contact';
import { userApi } from 'entities/user';
import { useEasyState, useRouter, useYup } from 'shared/hooks';
import { Modal, Input, Notification, ModalTypes } from 'shared/ui';

function ChangeNameContactModal(modal: ModalTypes.UseReturnedType) {
    const { params } = useRouter();

    const { data: contactData } = contactApi.handleGetContact({ contactId: Number(params.contact_id) });
    const { mutate: handleUpdateName } = contactApi.handleUpdateName();

    const proxyContact = contactProxy(contactData);
    const yup = useYup();

    const firstName = Input.use({
        yupSchema: yup.required('Введите имя контакта'),
        initialValue: contactData?.first_name || '',
    });

    const lastName = Input.use({
        initialValue: contactData?.last_name || '',
    });

    const save = () => {
        if (!firstName.value) {
            return firstName.setError('Введите имя контакта');
        }
        proxyContact &&
            handleUpdateName(
                {
                    id: proxyContact.id,
                    phone: proxyContact.phone,
                    first_name: firstName.value,
                    last_name: lastName.value || 'ㅤ',
                },
                { onSuccess: () => modal.close() }
            );
    };

    return <ChaneNameContactModalView save={save} inputs={{ firstName, lastName }} contact={proxyContact} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ChangeNameContactModal {...modal} />
        </Modal>
    );
}
