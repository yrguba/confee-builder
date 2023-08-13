import React from 'react';

import { chatApi, chatProxy, ChatSettingsModalView, chatTypes } from 'entities/chat';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

function ChatSettingsModal() {
    const chatSettingsModal = Modal.use<chatTypes.ModalName>('chat-settings');

    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);
    const { data: chatData } = chatApi.handleGetChat({ chatId: Number(params.chat_id) });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const deleteChat = () => {
        handleDeleteChat(
            { chatId },
            {
                onSuccess: () => {
                    chatSettingsModal.close();
                    navigate('/chats');
                },
            }
        );
    };

    return (
        <Modal {...chatSettingsModal}>
            <ChatSettingsModalView chat={chatProxy(chatData)} deleteChat={deleteChat} />
        </Modal>
    );
}

export default ChatSettingsModal;
