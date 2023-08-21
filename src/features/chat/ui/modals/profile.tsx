import React from 'react';

import { chatApi, chatProxy, ChatProfileModalView } from 'entities/chat';
import { useRouter } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

function ChatProfileModal(chatProfileModal: ModalTypes.UseReturnedType) {
    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);
    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const deleteChat = () => {
        handleDeleteChat(
            { chatId },
            {
                onSuccess: () => {
                    chatProfileModal.close();
                    navigate('/chats');
                },
            }
        );
    };

    return (
        <Modal {...chatProfileModal}>
            <ChatProfileModalView chat={chatProxy(chatData)} deleteChat={deleteChat} />
        </Modal>
    );
}

export default ChatProfileModal;
