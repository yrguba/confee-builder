import React from 'react';

import { chatApi, chatProxy, CreateChatModalView, chatTypes } from 'entities/chat';
import { useEasyState, useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

function CreteChatModal() {
    const { navigate } = useRouter();

    const createChatModal = Modal.use<chatTypes.ModalName>('create-chat');

    const chatState = useEasyState<{ user_ids: number[] | null; is_group: boolean }>({ user_ids: [], is_group: false });

    const { mutate: handleCreateChat, isLoading } = chatApi.handleCreateChat();

    const createChat = () => {
        handleCreateChat(chatState.value, {
            onSuccess: (data) => {
                createChatModal.close();
                navigate(`/chats/chat/${data.data.data.id}`);
            },
        });
    };

    return (
        <Modal {...createChatModal}>
            <CreateChatModalView chatState={chatState} createChat={createChat} loading={isLoading} />
        </Modal>
    );
}

export default CreteChatModal;
