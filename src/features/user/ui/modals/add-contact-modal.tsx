import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { AddContactModalView, useUserStore } from 'entities/user';
import { useInput, useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

import { yup } from '../../../../entities/viewer';

type Props = {
    direction?: 'column' | 'row';
};

function AddContactModal(props: Props) {
    const { direction } = props;

    const params = useParams();

    const firstNameInput = useInput({
        yupSchema: yup.checkRequired,
    });

    const openAddContactsModal = useUserStore.use.openAddContactsModal();
    const setOpenContactsModal = useUserStore.use.setOpenContactsModal();
    const setOpenAddContactsModal = useUserStore.use.setOpenAddContactsModal();

    const addContactModal = useModal();

    useEffect(() => {
        openAddContactsModal ? addContactModal.open() : addContactModal.close();
    }, [openAddContactsModal]);

    const close = () => {
        setOpenContactsModal(true);
        setOpenAddContactsModal(false);
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
