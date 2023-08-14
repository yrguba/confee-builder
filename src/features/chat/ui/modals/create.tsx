import React from 'react';

import { chatApi, chatProxy, CreateChatModalView, chatTypes } from 'entities/chat';
import { viewerApi, viewerTypes } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

function CreteChatModal() {
    const { navigate } = useRouter();

    const createChatModal = Modal.use<chatTypes.ModalName>('create-chat');

    const isGroup = useEasyState(false);
    const selectedUsers = useArray<viewerTypes.Contact>({});
    const { mutate: handleCreateChat, isLoading } = chatApi.handleCreateChat();
    const { data: contactsData } = viewerApi.handleGetContacts();

    const createChat = () => {
        handleCreateChat(
            { user_ids: selectedUsers.getIds(), is_group: isGroup.value },
            {
                onSuccess: (data) => {
                    createChatModal.close();
                    navigate(`/chats/chat/${data.data.data.id}`);
                },
            }
        );
    };

    return (
        <Modal {...createChatModal}>
            <CreateChatModalView isGroup={isGroup} contacts={contactsData} selectedUsers={selectedUsers} createChat={createChat} loading={isLoading} />
        </Modal>
    );
}

export default CreteChatModal;
