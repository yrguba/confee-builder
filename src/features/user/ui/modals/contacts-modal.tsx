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
    const setOpenAddContactsModal = useUserStore.use.setOpenAddContactsModal();

    const contactsModal = useModal();

    useEffect(() => {
        openContactsModal ? contactsModal.open() : contactsModal.close();
    }, [openContactsModal]);

    const openAddContactsModal = () => {
        setOpenContactsModal(false);
        setOpenAddContactsModal(true);
    };

    return (
        <>
            <Modal {...contactsModal} onClose={() => setOpenContactsModal(false)}>
                <ContactsModalView openAddContactsModal={openAddContactsModal} />
            </Modal>
        </>
    );
}

export default ContactsModal;
