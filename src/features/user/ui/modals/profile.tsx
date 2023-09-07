import React from 'react';

import { ContactProfileView, contactTypes, contactApi } from 'entities/contact';
import { userApi } from 'entities/user';
import { useEasyState, useYup } from 'shared/hooks';
import { Modal, Input, Notification, ModalTypes } from 'shared/ui';

import { UserProxy } from '../../../../entities/user/model/types';

function UserProfileModal(modal: ModalTypes.UseReturnedType<UserProxy>) {
    // return <ContactProfileView back={modal.close} addContact={addContact} inputs={{ firstName, lastName, phone }} />;
    const user = modal.payload;
    return <div>df</div>;
}

export default function (modal: ModalTypes.UseReturnedType) {
    if (!modal.payload) return null;
    return (
        <Modal {...modal}>
            <UserProfileModal {...modal} />
        </Modal>
    );
}
