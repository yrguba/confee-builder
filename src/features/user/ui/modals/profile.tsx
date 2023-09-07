import React from 'react';

import { userApi, UserProfileView } from 'entities/user';
import { Modal, Input, Notification, ModalTypes } from 'shared/ui';

import { UserProxy } from '../../../../entities/user/model/types';

function UserProfileModal(modal: ModalTypes.UseReturnedType<UserProxy>) {
    const user = modal.payload;

    return <UserProfileView user={user} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    if (!modal.payload) return null;
    return (
        <Modal {...modal}>
            <UserProfileModal {...modal} />
        </Modal>
    );
}
