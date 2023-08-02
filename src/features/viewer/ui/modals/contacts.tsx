import React, { useEffect } from 'react';

import { useUserStore } from 'entities/user';
import { ContactsModalView } from 'entities/viewer';
import { Input, Modal } from 'shared/ui';

function ContactsModal() {
    const openUserModal = useUserStore.use.openModal();
    const setOpenUserModal = useUserStore.use.setOpenModal();

    const contactsModal = Modal.use();
    const searchContactsInput = Input.use({});
    useEffect(() => {
        openUserModal === 'contacts' ? contactsModal.open() : contactsModal.close();
    }, [openUserModal]);

    return (
        <>
            <Modal {...contactsModal} onClose={() => setOpenUserModal(null)}>
                <ContactsModalView openAddContactsModal={() => setOpenUserModal('add-contact')} searchContactsInput={searchContactsInput} />
            </Modal>
        </>
    );
}

export default ContactsModal;
