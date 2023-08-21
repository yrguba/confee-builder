import React from 'react';

import { ChatSettingsModal, CreteChatModal, ChatInfoModal } from 'features/chat';
import { ForwardMessagesModal } from 'features/message';
import { UserPersonalInfoModal } from 'features/user';
import { AddContactModal, ContactsModal, ChangeBirthModal, ChangeNameModal, ChangeNicknameModal, ViewerPersonalInfoModal } from 'features/viewer';

function Modals() {
    return (
        <>
            <ChatInfoModal />
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
