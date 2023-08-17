import React from 'react';

import { ForwardMessagesModalView, messageTypes, useMessageStore } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import { chatApi, chatProxy } from '../../../../entities/chat';

function ForwardMessagesModal() {
    const { navigate } = useRouter();

    const { data: chatsData } = chatApi.handleGetChats();

    const forwardMessagesModal = Modal.use<messageTypes.Modals>('forwardMessages');
    const forwardMessages = useMessageStore.use.forwardMessages();

    const clickChat = (chatId: number) => {
        forwardMessagesModal.close();
        forwardMessages.set({ ...forwardMessages.value, redirect: true });
        navigate(`/chats/chat/${chatId}`);
    };

    return (
        <Modal {...forwardMessagesModal} closeIcon={false}>
            <ForwardMessagesModalView clickChat={clickChat} chats={chatsData?.map((chat) => chatProxy(chat))} back={forwardMessagesModal.close} />
        </Modal>
    );
}

export default ForwardMessagesModal;
