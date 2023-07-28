import React from 'react';

import { AddContactModal, ContactsModal, UserPersonalInfoModal } from 'features/user';
import { ChangeBirthModal, ChangeNameModal, ChangeNicknameModal, ViewerPersonalInfoModal } from 'features/viewer';

function Modals() {
    return (
        <>
            <ChangeBirthModal />
            <ChangeNicknameModal />
            <ChangeNameModal />
            <ViewerPersonalInfoModal />
            <UserPersonalInfoModal />
            <ContactsModal />
            <AddContactModal />
        </>
    );
}

export default Modals;
