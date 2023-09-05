import React from 'react';

import { chatApi, chatProxy } from 'entities/chat';
import { ForwardMessagesModalView, useMessageStore } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

import chatService from '../../../../entities/chat/lib/service';
import { createMemo } from '../../../../shared/hooks';

const memoChats = createMemo(chatService.getUpdatedChatsList);

function ForwardMessagesModal(modal: ModalTypes.UseReturnedType) {
    const { navigate } = useRouter();

    const { data: allChatsData } = chatApi.handleGetChats({ type: 'all' });

    const allChatsProxy = memoChats(allChatsData);

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

    return <ForwardMessagesModalView clickChat={clickChat} chats={allChatsProxy?.map((chat) => chatProxy(chat))} back={back} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ForwardMessagesModal {...modal} />
        </Modal>
    );
}
