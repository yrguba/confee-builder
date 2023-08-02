import React, { useEffect } from 'react';

import { useUserStore } from 'entities/user';
import { ContactsModalView } from 'entities/viewer';
import { useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

function ContactsModal() {
    const openUserModal = useUserStore.use.openModal();
    const setOpenUserModal = useUserStore.use.setOpenModal();

    const contactsModal = useModal();

    useEffect(() => {
        openUserModal === 'contacts' ? contactsModal.open() : contactsModal.close();
    }, [openUserModal]);

    return (
        <>
            <Modal {...contactsModal} onClose={() => setOpenUserModal(null)}>
                <ContactsModalView openAddContactsModal={() => setOpenUserModal('add-contact')} />
            </Modal>
        </>
    );
}

export default ContactsModal;
