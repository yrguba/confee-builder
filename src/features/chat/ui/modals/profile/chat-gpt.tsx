import React from 'react';

import { ChatGptProfileModalView, PrivateChatProfileModalView } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { UserProxy } from 'entities/user/model/types';
import { Modal, ModalTypes } from 'shared/ui';

function ChatGptProfileModal(modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    return <ChatGptProfileModalView />;
}

export default function (modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    return (
        <Modal {...modal} centered={false}>
            <ChatGptProfileModal {...modal} />
        </Modal>
    );
}
