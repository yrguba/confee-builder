import React, { useEffect } from 'react';

import { ContactsModalView, viewerTypes } from 'entities/viewer';
import { Input, Modal } from 'shared/ui';

function ContactsModal() {
    const contactsModal = Modal.use<viewerTypes.ModalName>('contacts', { showPrevModalAfterClose: true });
    const searchContactsInput = Input.use({});

    return (
        <>
            <Modal {...contactsModal}>
                <ContactsModalView openAddContactsModal={() => console.log('add-contact')} searchContactsInput={searchContactsInput} />
            </Modal>
        </>
    );
}

export default ContactsModal;
