import React from 'react';

import { ChatSettingsModal, CreteChatModal } from 'features/chat';
import { ForwardMessagesModal } from 'features/message';
import { UserPersonalInfoModal } from 'features/user';
import { AddContactModal, ContactsModal, ChangeBirthModal, ChangeNameModal, ChangeNicknameModal, ViewerPersonalInfoModal } from 'features/viewer';

function Modals() {
    return (
        <>
            <ForwardMessagesModal />
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
