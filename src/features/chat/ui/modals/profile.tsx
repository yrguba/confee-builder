import React from 'react';

import { chatApi, chatProxy, ChatProfileModalView, chatTypes } from 'entities/chat';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

function ChatProfileModal() {
    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);
    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const chatProfileModal = Modal.use();

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
