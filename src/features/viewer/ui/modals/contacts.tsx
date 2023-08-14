import React, { useEffect, useState } from 'react';

import { ContactsModalView, viewerApi, viewerTypes } from 'entities/viewer';
import { Input, Modal } from 'shared/ui';

function ContactsModal() {
    const contactsModal = Modal.use<viewerTypes.ModalName>('contacts');
    const addContactsModal = Modal.use<viewerTypes.ModalName>('add-contact');

    const { data: contactsData } = viewerApi.handleGetContacts();

    const searchContactsInput = Input.use({});

    return (
        <>
            <Modal {...contactsModal}>
                <ContactsModalView contacts={contactsData} openAddContactsModal={addContactsModal.open} searchContactsInput={searchContactsInput} />
            </Modal>
        </>
    );
}

export default ContactsModal;
