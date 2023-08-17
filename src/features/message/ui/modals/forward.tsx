import React from 'react';

import { ForwardMessagesModalView, messageTypes } from 'entities/message';
import { viewerApi, viewerTypes } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import { chatApi, chatProxy } from '../../../../entities/chat';
import { ChatProxy } from '../../../../entities/chat/model/types';

function ForwardMessagesModal() {
    const { navigate } = useRouter();

    const { data: chatsData } = chatApi.handleGetChats();

    const forwardMessagesModal = Modal.use<messageTypes.Modals>('forwardMessages');

    const clickChat = (chat: ChatProxy) => {
        console.log(chat);
    };

    return (
        <Modal {...forwardMessagesModal} closeIcon={false}>
            <ForwardMessagesModalView clickChat={clickChat} chats={chatsData?.map((chat) => chatProxy(chat))} back={forwardMessagesModal.close} />
        </Modal>
    );
}

export default ForwardMessagesModal;
