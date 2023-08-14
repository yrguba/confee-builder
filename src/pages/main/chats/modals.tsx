import React from 'react';

import { ChatSettingsModal, CreteChatModal } from 'features/chat';
import { UserPersonalInfoModal } from 'features/user';
import { AddContactModal, ContactsModal, ChangeBirthModal, ChangeNameModal, ChangeNicknameModal, ViewerPersonalInfoModal } from 'features/viewer';

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
            <ChatSettingsModal />
            <CreteChatModal />
        </>
    );
}

export default Modals;
