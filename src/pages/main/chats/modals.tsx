import React from 'react';

import { ChatProfileModal, CreteChatModal } from 'features/chat';
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
            <ChatProfileModal />
        </>
    );
}

export default Modals;
