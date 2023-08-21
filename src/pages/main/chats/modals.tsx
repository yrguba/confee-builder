import React from 'react';

import { AddContactModal, ContactsModal, ChangeBirthModal, ChangeNameModal, ChangeNicknameModal, ViewerPersonalInfoModal } from 'features/viewer';

function Modals() {
    return (
        <>
            <ChangeBirthModal />
            <ChangeNicknameModal />
            <ChangeNameModal />
            <ViewerPersonalInfoModal />
            <ContactsModal />
            <AddContactModal />
        </>
    );
}

export default Modals;
