import React from 'react';

import { chatApi, chatProxy } from 'entities/chat';
import { ForwardMessagesModalView, useMessageStore } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

function ForwardMessagesModal(modal: ModalTypes.UseReturnedType) {
    const { navigate } = useRouter();

    const { data: chatsData } = chatApi.handleGetChats({ type: 'all' });

    const forwardMessages = useMessageStore.use.forwardMessages();

    const clickChat = (chatId: number) => {
        modal.close();
        forwardMessages.set({ ...forwardMessages.value, toChatId: chatId, redirect: true });
        navigate(`/chats/chat/${chatId}`);
    };

    const back = () => {
        modal.close();
        forwardMessages.clear();
    };

    return <ForwardMessagesModalView clickChat={clickChat} chats={chatsData?.map((chat) => chatProxy(chat))} back={back} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ForwardMessagesModal {...modal} />
        </Modal>
    );
}
