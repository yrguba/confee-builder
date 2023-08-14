import React, { useEffect, useState } from 'react';

import { ContactsModalView, viewerApi, viewerTypes } from 'entities/viewer';
import { Input, Modal } from 'shared/ui';

function ContactsModal() {
    const contactsModal = Modal.use<viewerTypes.ModalName>('contacts');
    const addContactsModal = Modal.use<viewerTypes.ModalName>('add-contact');

    const { data: contactsData } = viewerApi.handleGetContacts();

    const searchContactsInput = Input.use({});

    const [a, set] = useState<any>([]);
    useEffect(() => {
        if (contactsData?.length) {
            for (let i = 0; i < 100; i++) {
                set((prev: any) => [...prev, contactsData[0]]);
            }
        }
    }, [contactsData]);
    return (
        <>
            <Modal {...contactsModal}>
                <ContactsModalView contacts={a} openAddContactsModal={addContactsModal.open} searchContactsInput={searchContactsInput} />
            </Modal>
        </>
    );
}

export default ContactsModal;
