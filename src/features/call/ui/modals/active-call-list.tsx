import React from 'react';

import { ActiveCallListModalView, callTypes, useCall } from 'entities/call';
import { Modal, ModalTypes } from 'shared/ui';

import { chatApi, chatProxy } from '../../../../entities/chat';
import { ChatProxy } from '../../../../entities/chat/model/types';
import { viewerStore } from '../../../../entities/viewer';

function ActiveCallListModal(modal: ModalTypes.UseReturnedType<{ chatId: number }>) {
    const { data: chatData } = chatApi.handleGetChat({ chatId: modal.payload.chatId });
    const viewer = viewerStore.use.viewer();

    const proxyChat = chatProxy(chatData?.data.data);

    const { leftCall, joinCall } = useCall();

    const action = (imInRoom: boolean, call: callTypes.CallInActiveCallList) => {
        if (proxyChat) {
            if (imInRoom) {
                leftCall({ call_id: call.id, chat_id: proxyChat.id, roomId: call.room });
            } else {
                joinCall({
                    callId: call.id,
                    avatar: '',
                    chatId: proxyChat?.id,
                    name: '',
                    initiatorId: 0,
                    users_ids: [],
                    roomId: call.room,
                });
            }
        }
    };

    return <ActiveCallListModalView action={action} viewer={viewer.value} chat={proxyChat} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <ActiveCallListModal {...modal} />
        </Modal>
    );
}
