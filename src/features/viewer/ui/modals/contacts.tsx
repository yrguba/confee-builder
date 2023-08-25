import React from 'react';

import { ContactsModalView, viewerApi } from 'entities/viewer';
import { Input, Modal, ModalTypes } from 'shared/ui';

import AddContactModal from './add-contact';

function ContactsModal() {
    const addContactsModal = Modal.use();

    const { data: contactsData } = viewerApi.handleGetContacts();

    const searchContactsInput = Input.use({});

    return (
        <>
            <AddContactModal {...addContactsModal} />
            <ContactsModalView contacts={contactsData} openAddContactsModal={addContactsModal.open} searchContactsInput={searchContactsInput} />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ContactsModal />
        </Modal>
    );
}
