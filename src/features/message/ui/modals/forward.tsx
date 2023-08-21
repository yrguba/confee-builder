import React from 'react';

import { chatApi, chatProxy } from 'entities/chat';
import { ForwardMessagesModalView, useMessageStore } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

function ForwardMessagesModal(forwardMessagesModal: ModalTypes.UseReturnedType) {
    const { navigate } = useRouter();

    const { data: chatsData } = chatApi.handleGetChats();

    const forwardMessages = useMessageStore.use.forwardMessages();

    const clickChat = (chatId: number) => {
        forwardMessagesModal.close();
        forwardMessages.set({ ...forwardMessages.value, toChatId: chatId, redirect: true });
        navigate(`/chats/chat/${chatId}`);
    };

    return (
        <Modal {...forwardMessagesModal} closeIcon={false}>
            <ForwardMessagesModalView clickChat={clickChat} chats={chatsData?.map((chat) => chatProxy(chat))} back={forwardMessagesModal.close} />
        </Modal>
    );
}

export default ForwardMessagesModal;
