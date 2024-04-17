import React from 'react';

import { ActiveCallListModalView, callTypes } from 'entities/call';
import { Modal, ModalTypes } from 'shared/ui';

import { chatApi, chatProxy } from '../../../../entities/chat';
import { ChatProxy } from '../../../../entities/chat/model/types';

function ActiveCallListModal(modal: ModalTypes.UseReturnedType<{ chatId: number }>) {
    const { data: chatData } = chatApi.handleGetChat({ chatId: modal.payload.chatId });

    return <ActiveCallListModalView chat={chatProxy(chatData?.data.data)} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <ActiveCallListModal {...modal} />
        </Modal>
    );
}
