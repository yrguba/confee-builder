import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ContactsModalView, useUserStore } from 'entities/user';
import { usePrevious } from 'shared/hooks';
import { Modal, useModal } from 'shared/ui';

type Props = {
    direction?: 'column' | 'row';
};

function ContactsModal(props: Props) {
    const { direction } = props;

    const params = useParams();

    const openContactsModal = useUserStore.use.openContactsModal();
    const setOpenContactsModal = useUserStore.use.setOpenContactsModal();

    const contactsModal = useModal();
    const addContactModal = useModal();

    useEffect(() => {
        openContactsModal ? contactsModal.open() : contactsModal.close();
    }, [openContactsModal]);

    // useEffect(() => {
    //     openAddContactModal ? addContactModal.open() : addContactModal.close();
    // }, [openAddContactModal]);

    return (
        <>
            <Modal {...contactsModal} onClose={() => setOpenContactsModal(false)}>
                <ContactsModalView />
            </Modal>
            <Modal {...addContactModal}>
                <div>wdawdawdd</div>
            </Modal>
        </>
    );
}

export default ContactsModal;
