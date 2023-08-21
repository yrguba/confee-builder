import React from 'react';

import { ContactsModalView, viewerApi } from 'entities/viewer';
import { Input, Modal, ModalTypes } from 'shared/ui';

function ContactsModal() {
    const addContactsModal = Modal.use();

    const { data: contactsData } = viewerApi.handleGetContacts();

    const searchContactsInput = Input.use({});
    return <ContactsModalView contacts={contactsData} openAddContactsModal={addContactsModal.open} searchContactsInput={searchContactsInput} />;
}

export default function (contactsModal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...contactsModal}>
            <ContactsModal />
        </Modal>
    );
}
